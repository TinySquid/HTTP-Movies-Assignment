import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from './Movies/MovieUpdate';
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    if (savedList.includes(movie)) {
      return;
    } else {
      setSavedList([...savedList, movie]);
    }
  };

  const updateSavedList = movieId => {
    //Remove movie from saved list
    setSavedList(savedList.filter(movie => movie.id !== movieId));
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} updateSavedList={updateSavedList} />;
        }}
      />
      <Route path="/update-movie/:id" render={props => <MovieUpdate {...props} />} />
      <Route path="/add-movie" render={props => <AddMovie {...props} />} />
    </>
  );
};

export default App;
