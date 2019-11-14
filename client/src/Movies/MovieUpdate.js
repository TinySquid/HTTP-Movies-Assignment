import React, { useState, useEffect } from 'react';

import axios from 'axios';

const MovieUpdate = props => {
  //Form input state
  const [inputs, setInputs] = useState({
    id: null,
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  //Set state to movie details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setInputs(res.data))
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const handleChange = e => {
    //Shorter name
    const input = e.target;

    if (input.name !== "stars") {
      setInputs({
        ...inputs,
        [input.name]: input.value
      });
    } else {
      //Get correct id of actor input from data attribute
      const id = input.getAttribute('data-id');

      //Make a new array and spread existing stars in it
      const newStars = [...inputs.stars];

      //Alter just the star input we are editing
      newStars[id] = input.value;

      //Update state
      setInputs({
        ...inputs,
        stars: newStars
      });
    }

  }

  const handleSubmit = e => {
    e.preventDefault();

    const movie = inputs;

    //Purge empty actor elements before sending to server
    movie.stars = movie.stars.filter(star => star !== "")

    //Update movie details
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => alert('Movie Details Updated!'))
      .catch(error => alert(error))
      .finally(() => props.history.push(`/movies/${movie.id}`));
  }

  return (
    <form className="update-movie" onSubmit={handleSubmit}>
      <h1>Update Movie Details</h1>
      <label> Movie Title
      <input type="text" name="title" value={inputs.title} onChange={handleChange} />
      </label>
      <label>
        Director
      <input type="text" name="director" value={inputs.director} onChange={handleChange} />
      </label>
      <label>
        Metascore
      <input type="text" name="metascore" value={inputs.metascore} onChange={handleChange} />
      </label>
      <h2>Actors</h2>
      {/* Map over stars and dynamically create an input for each one */}
      {inputs.stars.map((star, idx) => (
        <input key={idx} data-id={idx} type="text" name="stars" value={inputs.stars[idx]} onChange={handleChange} />
      ))}
      <button type="submit">Submit</button>
    </form>
  )
}

export default MovieUpdate;
