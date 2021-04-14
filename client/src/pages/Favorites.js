import React from 'react'
import Navbar from '../components/Navbar'
import { useReactiveVar } from '@apollo/client'
import { favoritesVar } from '../graphql/vars'
import CardFavorites from '../components/CardFavorites'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const favorites = useReactiveVar(favoritesVar)

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <h1 className="mt-5">Your Favorites</h1>
        <div className="mt-3 mb-5 row mx-5 d-flex justify-content-center" style={{ width: "100%" }}>
          {
            favorites.length < 1 ? <h1 className="mt-5">Daftar Favorites not found, silahkan kembali ke halaman <span><Link to="/" >Home</Link></span></h1> :
            favorites?.map(favorite => {
              return <CardFavorites favorite={favorite} key={favorite._id} />
            })
          }
        </div>
      </div>
    </div>
  )
}
