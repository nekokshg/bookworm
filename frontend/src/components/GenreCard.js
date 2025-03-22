import '../styles/Genre.css';

const GenreCard = ({genre}) => {
    return (
        <li className="genreItem">
            {genre}
        </li>
    )
}

export default GenreCard;