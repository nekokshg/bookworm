const EditableGenreList = ({ genres, onRemove }) => {
    return (
      <ul className="genreList">
        {genres.map((genre) => (
          <li key={genre._id} className="genreItem">
            {genre.name}
            <button
              className="removeGenreBtn"
              onClick={() => onRemove(genre._id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default EditableGenreList;