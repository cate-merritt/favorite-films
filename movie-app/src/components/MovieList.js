const MovieList = (props) => {
  const FavoriteComponent = props.favoriteComponent;

  // Check if props.movies is null before mapping over it
  if (!props.movies) {
    return <div>Loading...</div>; // or display an error message
  }

  return (
    <>
      {props.movies.map((movie, index) => (
        <div key={index} className='image-container d-flex justify-content-start m-3 position-relative'>
          <img src={movie.Poster} alt='movie' />
          <div  
            onClick={() => props.handleFavoritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
