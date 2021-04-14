import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Form, Button } from 'react-bootstrap'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
// import { editVar } from '../graphql/vars'
// import { useReactiveVar, useQuery } from '@apollo/client'
import { FETCH_ALL } from '../pages/Home'

const EDIT_MOVIE = gql`
  mutation editmovie ($idMovie: ID, $inputEdit: MovieInput) {
  editMovie(_id: $idMovie, editExistingMovie: $inputEdit){
    message
  }
}
`

const SHOW_ONE_MOVIE = gql`
  query showmoviebyid ($idMovie: ID){
    Movie(_id: $idMovie){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const SHOW_ONE_SERIES = gql`
  query showtvserie ($idMovie: ID){
  TvSerie(_id: $idMovie){
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export default function EditMovies() {
  const { id, params } = useParams()
  const history = useHistory()
  // const editDataDisplay = useReactiveVar(editVar)

  const { data, loading, error } = useQuery(SHOW_ONE_MOVIE, {
    variables: {
      idMovie: id
    }
  })

  useEffect(() => {
      if (data) {
        console.log(data)
        setMovieInput({
          title: data[params].title,
          overview: data[params].overview,
          poster_path: data[params].poster_path,
          popularity: data[params].popularity,
          tags: data[params].tags
        })
      }
  }, [data])

  const [movieInput, setMovieInput] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
    tags: ''
  })

  function onChange (e) {
    e.preventDefault()
    let { name, value } = e.target
    console.log(name)
    const newInput = { ...movieInput, [name]: value}
    setMovieInput(newInput)
  }

  const [ editMovie ] =  useMutation(EDIT_MOVIE, {
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

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error here {JSON.stringify(error)}</h1>
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <h1>Hello edit Movies</h1>
        {JSON.stringify(data)}
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
