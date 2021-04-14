import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { editVar } from '../graphql/vars'
import { useReactiveVar } from '@apollo/client'
import { FETCH_ALL } from '../pages/Home'

const EDIT_MOVIE = gql`
  mutation editmovie ($idMovie: ID, $inputEdit: MovieInput) {
  editMovie(_id: $idMovie, editExistingMovie: $inputEdit){
    _id
    title
  }
}
`

export default function EditMovies() {
  const { id } = useParams()
  const history = useHistory()
  const editDataDisplay = useReactiveVar(editVar)

  const [movieInput, setMovieInput] = useState({
    title: editDataDisplay.title,
    overview: editDataDisplay.overview,
    poster_path: editDataDisplay.poster_path,
    popularity: editDataDisplay.popularity,
    tags: editDataDisplay.tags
  })

  function onChange (e) {
    e.preventDefault()
    let { name, value } = e.target
    console.log(name)
    const newInput = { ...movieInput, [name]: value}
    setMovieInput(newInput)
  }

  const [ editMovie, { data, loading, error }] =  useMutation(EDIT_MOVIE, {
    refetchQueries: [
      { query: FETCH_ALL }
    ]
  })

  function submitButton (e) {
    e.preventDefault()
    console.log(movieInput)
    editMovie({
      variables: {
        idMovie: id,
        inputEdit: { ...movieInput, popularity: Number(movieInput.popularity)} 
      }
    })
    history.push('/')
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <h1>Hello edit Movies</h1>
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
            <Form.Control type="number" min="0" max="10" name="popularity" placeholder="Enter Popularity" value={Number(movieInput.popularity)} onChange={onChange} />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label>Add Tags</Form.Label>
            <Form.Control type="text" name="tags" placeholder="Enter Tags" value={movieInput.tags} onChange={onChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Edit Data
          </Button>
        </Form>
        </div>
      </div>
    </div>
  )
}
