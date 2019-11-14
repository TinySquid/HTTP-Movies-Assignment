import React, { useState, useEffect } from 'react'

import axios from 'axios';
/*
Format to send to server endpoint
  id: 4,
  title: "Dumb and Dumber",
  director: "The Farely Brothers",
  metascore: 76,
  stars: ["Jim Carrey", "Jeff Daniels", "Lauren Holly"]
*/

const MovieUpdate = props => {
  const [inputs, setInputs] = useState({
    id: null,
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setInputs(res.data))
      .catch(err => console.log(err.response));
  }, []);

  return (
    <form className="update-movie">
      <h1>Update Movie Details</h1>
      <label> Movie Title
      <input type="text" name="title" value={inputs.title} placeholder="Movie title" />
      </label>
      <label>
        Director
      <input type="text" name="director" value={inputs.director} />
      </label>
      <label>
        Metascore
      <input type="text" name="metascore" value={inputs.metascore} />
      </label>
      <h2>Actors</h2>
      {inputs.stars.map((star, idx) => (
        <input key={idx} type="text" name="stars" value={inputs.stars[idx]} placeholder="Actor name" />
      ))}
    </form>
  )
}

export default MovieUpdate
