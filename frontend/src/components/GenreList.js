import GenreCard from './GenreCard';
import '../styles/Genre.css';

const GenreList = ({genres}) => {
    return (
        <ul className='genreList'>
            {genres.map(genre => (
                <GenreCard key={genre._id} genre={genre.name} />
            ))}
        </ul>
    )
}

export default GenreList;