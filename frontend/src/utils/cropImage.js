// utils/cropImage.js
export default function getCroppedImg(imageSrc, pixelCrop) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
  
        ctx.drawImage(
          img,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
  
        const base64 = canvas.toDataURL('image/jpeg');
        resolve(base64);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  }
  