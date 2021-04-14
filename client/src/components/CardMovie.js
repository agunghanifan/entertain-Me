import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { FETCH_ALL } from '../pages/Home'
import { favoritesVar, editVar } from '../graphql/vars'
import { Row, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovie({
          variables: {
            idMovie: id
          }
        })
        Swal.fire(
          'Deleted!',
          'Your Movie has been deleted.',
          'success'
        )
      }
    })
     
  }

  function goToFavorites(e, { id, params }) {
    let noMatch = false
    e.preventDefault()
    console.log(id)
    const favorites = favoritesVar()
    const newFavorite = {
      _id: movie._id,
      title: movie.title,
      poster_path: movie.poster_path,
      popularity: movie.popularity,
    }
    favorites?.forEach(favorite => {
      if(favorite._id === newFavorite._id) {
        noMatch = true
        // alert('Movie already in favorites')
        let timerInterval
        MySwal.fire({
          title: 'This Movie has been added to your favorites',
          html: 'I will close in <b></b> milliseconds.',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            MySwal.showLoading()
            timerInterval = setInterval(() => {
              const content = MySwal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = MySwal.getTimerLeft()
                }
              }
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      }
    })
    if (!noMatch) {
      favoritesVar([newFavorite, ...favorites])
      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Success added to your favorites',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  function goToEdit(e, { id, params }) {
    console.log(id, params)
    const editDataDisplay = {
      _id: movie._id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      popularity: movie.popularity,
      tags: movie.tags,
    }
    editVar(editDataDisplay)
    history.push(`/movie/${params}/${id}`)
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error here {JSON.stringify(error)}</h1>
  }

  return (
    <>
      <Card style={{ width: "25rem" }} className="mx-3">
        <Card.Img variant="top" src={movie.poster_path} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            Rating: {movie.popularity} ⭐️
          </Card.Text>
          <Row className="">
            <Col>
              <Button variant="primary" className="mb-2" onClick={(e) => goToDetails(e, { id: movie._id, params })}>Go Details 💭</Button>
              <Button variant="danger" onClick={(e) => goToDelete(e, { id: movie._id, params })}>Delete 🤯</Button>
            </Col>
            <Col>
              <Button variant="warning" className="mb-2" onClick={(e) => goToFavorites(e, { id: movie._id, params })}>Add to Favorite 💗</Button>
              <Button variant="warning" onClick={(e) => goToEdit(e, { id: movie._id, params })}>Edit data 🧑‍💻</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}
