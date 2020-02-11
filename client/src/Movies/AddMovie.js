import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = props => {
  const [inputs, setInputs] = useState({
    id: null,
    title: '',
    director: '',
    metascore: '',
    stars: ['']
  });

  const addActor = e => {
    e.preventDefault();
    setInputs({ ...inputs, stars: [...inputs.stars, ''] });
  }

  const handleChange = e => {
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
    movie.stars = movie.stars.filter(star => star !== "");

    //Update movie details
    axios.post(`http://localhost:5000/api/movies`, movie)
      .then(res => alert('New Movie Added!'))
      .catch(error => alert(error))
      .finally(() => props.history.push('/'));
  }

  return (
    <form className="add-movie" onSubmit={handleSubmit}>
      <h1>Add A New Movie</h1>
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
      <div className="add-actor">
        <button onClick={addActor}>+</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddMovie;
