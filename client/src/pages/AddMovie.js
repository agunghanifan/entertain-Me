import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'

export default function FormMovies() {
  const ADD_MOVIE = gql`
    mutation addmovie ($newInputMovie: MovieInput) {
      addMovie(newMovie: $newMovie) {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `
  
  const [movieInput, setMovieInput] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: 0,
    tags: ''
  })

  const [ addMovie, { data, loading, error }] =  useMutation(ADD_MOVIE)

  function onChange (e) {
    let { name, value } = e.target
    console.log(name)
    const newInput = { ...movieInput, [name]: value}
    setMovieInput(newInput)
  }

  function submitButton (e) {
    e.preventDefault()
    console.log(movieInput)
    addMovie({
      variables: {
        newInputMovie: movieInput 
      }
    })
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
      <Form onSubmit={(e) => submitButton(e)}>
        <Form.Group controlId="">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter title" value={movieInput.title} onChange={onChange} />
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Overview</Form.Label>
          <Form.Control type="text" name="overview" placeholder="Enter overview" value={movieInput.overview} onChange={onChange} />
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Poster Path</Form.Label>
          <Form.Control type="url" name="poster_path" placeholder="Enter url" value={movieInput.poster_path} onChange={onChange} />
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Popularity</Form.Label>
          <Form.Control type="number" min="0" max="5" name="popularity" placeholder="Enter Popularity" value={movieInput.popularity} onChange={onChange} />
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Add Tags</Form.Label>
          <Form.Control type="text" min="0" max="5" name="tags" placeholder="Enter Tags" value={movieInput.tags} onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    </div>
  )
}
