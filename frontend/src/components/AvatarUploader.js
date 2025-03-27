import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import '../styles/AvatarUploader.css';

const AvatarUploader = ({ onUpload, onClose }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5); // start zoomed in
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) { // 1MB limit
      setError('Please choose an image under 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleUpload = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onUpload(croppedImage);
      onClose();
    } catch (e) {
      console.error('Crop failed', e);
    }
  };

  return (
    <div className="avatarUploaderOverlay">
      <div className="avatarUploaderModal">
        <h3>Upload and Crop Avatar</h3>

        {!image ? (
          <div>
            <label className="uploadButton">
              Choose Image
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
            {error && <p className="uploadError">{error}</p>}
            <button className="cancelButton" onClick={onClose}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="cropContainer">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                minZoom={1.2}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round" // 👈 this makes it circular
                showGrid={false}
              />
            </div>
            <div className="cropControls">
              <input
                type="range"
                min={1.2}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />
              <button className="confirmButton" onClick={handleUpload}>
                Confirm
              </button>
              <button className="cancelButton" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AvatarUploader;
