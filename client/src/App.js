import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from './Movies/MovieUpdate';
import axios from "axios";
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    if (savedList.find(savedMovie => savedMovie == movie)) {
      return;
    } else {
      setSavedList([...savedList, movie]);
    }
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-movie/:id" render={props => <MovieUpdate {...props} />} />
      <Route path="/add-movie" render={props => <AddMovie {...props} />} />
    </>
  );
};

export default App;
