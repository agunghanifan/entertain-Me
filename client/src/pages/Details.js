import React from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Card, ListGroup } from 'react-bootstrap'

export default function Details() {
  const { id, params } = useParams()
  let FETCH_DETAILS = null
  
  if (params === 'Movie') {
    FETCH_DETAILS = gql`
      query showmoviebyid ($userId: ID) {
        Movie (_id: $userId) {
          _id
          title
          overview
          poster_path
          popularity
          tags
        }
      }
    `
  } else if (params === 'TvSerie') {
    FETCH_DETAILS = gql`
      query showtvseriebyid ($userId: ID) {
        TvSerie (_id: $userId) {
          _id
          title
          overview
          poster_path
          popularity
          tags
        }
      }
    `
  }

  const { data, loading, error } = useQuery(FETCH_DETAILS, {
    variables: {
      userId: id
    }
  })

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <h1>Hello Details</h1>
        {
          loading ? <h1>Loading...</h1> :
          error ? <h1>We found some errors...</h1> :
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data[params].poster_path} />
            <Card.Body>
              <Card.Title>{data[params].title}</Card.Title>
              <Card.Text>
                {data[params].overview}
              </Card.Text>
              <Card.Text>
                {data[params].popularity}
              </Card.Text>
              <ListGroup>
                {
                  data[params].tags.map((tag) => {
                    return <ListGroup.Item key={tag}>{tag}</ListGroup.Item>
                  })
                }
              </ListGroup>
            </Card.Body>
          </Card>
        }
      </div>
    </div>
  )
}
