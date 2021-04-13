import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { FETCH_ALL } from '../pages/Home'

const DELETE_MOVIE = gql`
  mutation deletemovie ($idMovie: ID) {
    deleteMovie(_id: $idMovie){
      _id
      title
    }
  }
`

export default function CardMovie(props) {
  const { movie, params } = props
  const history = useHistory()
  const [ deleteMovie, { data, loading, error }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [
      { query: FETCH_ALL }
    ]
  })

  function goToDetails (e, { id, params }) {
    e.preventDefault()
    history.push(`/details/${params}/${id}`)
  }

  function goToDelete(e, { id, params }) {
    e.preventDefault()
    console.log(id)
    deleteMovie({
      variables: {
        idMovie: id
      }
    }) 
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error here {JSON.stringify(error)}</h1>
  }

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.poster_path} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            {movie.popularity}
          </Card.Text>
          <Button variant="primary" onClick={(e) => goToDetails(e, { id: movie._id, params })}>Go Details</Button>
          <Button variant="danger" className="mx-2" onClick={(e) => goToDelete(e, { id: movie._id, params })}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  )
}
