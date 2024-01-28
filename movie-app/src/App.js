import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ead335d9`;
  
    const response = await fetch(url);
    const responseJson = await response.json();
  
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    setFavorites(movieFavorites || []); // Ensure movieFavorites is an array or default to an empty array
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = Array.isArray(favorites) ? [...favorites, movie] : [movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = Array.isArray(favorites)
      ? favorites.filter((favorite) => favorite.imdbID !== movie.imdbID)
      : [];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row'> 
        <div className='col'>
          <MovieListHeading heading='Search Films' />
        </div>
        <div className='col d-flex justify-content-end'>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      </div> 

      <div className='row'>
        <MovieList 
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent ={AddFavorites} />
      </div>

      {favorites.length > 0 && (
        <div className='col'>
          <MovieListHeading heading='Favorites'/>
        </div>
      )}

      <div className='row mt-4 mb-4'>
        <MovieList
          movies={favorites}
          handleFavoritesClick={removeFavoriteMovie}
          favoriteComponent ={RemoveFavorites} 
        />
      </div>
    </div>
  );
};

export default App;
