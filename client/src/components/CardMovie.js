import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function CardMovie(props) {
  const { movie, params } = props
  const history = useHistory()

  function goToDetails (e, { id, params }) {
    e.preventDefault()
    history.push(`/details/${params}/${id}`)
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
        </Card.Body>
      </Card>
    </div>
  )
}
