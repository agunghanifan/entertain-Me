import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { favoritesVar } from '../graphql/vars'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function CardFavorites(props) {

  const { favorite } = props
  const history = useHistory()

  function goToDetails (e, { id, params }) {
    e.preventDefault()
    history.push(`/details/${params}/${id}`)
  }

  function deleteFavorite (e, { id, params }) {
    e.preventDefault()
    console.log(id)
    let favorites = favoritesVar()
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
        const newFavorites = favorites.filter(favorite => favorite._id !== id)
        favoritesVar(newFavorites)
        Swal.fire(
          'Deleted!',
          'Your Movie has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <>
      <Card style={{ width: '22rem' }} className="mx-3">
        <Card.Img variant="top" src={favorite.poster_path} />
        <Card.Body>
          <Card.Title>{favorite.title}</Card.Title>
          <Card.Text>
            {favorite.popularity}
          </Card.Text>
          <Button variant="primary" onClick={(e) => goToDetails(e, { id: favorite._id, params: 'Movie' })}>Go Details 💭</Button>
          <Button variant="danger" className="mx-1" onClick={(e) => deleteFavorite(e, { id: favorite._id, params: 'Movie' })}>Delete Favorites 🤯</Button>
        </Card.Body>
      </Card>
    </>
  )
}
