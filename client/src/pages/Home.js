import React from 'react'
import Navbar from '../components/Navbar'
import { useQuery, gql } from '@apollo/client'
import CardMovie from '../components/CardMovie'

export const FETCH_ALL = gql`
  query fetchall {
  Movies{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
  TvSeries{
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}`

export default function Home() {

  const { data, loading, error} = useQuery(FETCH_ALL)

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <h1>Home</h1>  
      </div>
      <div>
        <h1>Movies</h1>
        {
          loading ? <h1>Loading...</h1> :
          error ? <h1>We found Error</h1> :
          data.Movies.map((movie) => {
            return <CardMovie movie={movie} params={"Movie"} key={movie._id} />
          })
        }
        <h1>TV Series</h1>
        {
          loading ? <h1>Loading...</h1> :
          error ? <h1>We found Error</h1> :
          data.TvSeries.map((movie) => {
            return <CardMovie movie={movie} params={"TvSerie"} key={movie._id} />
          })
        }
      </div>
    </div>
  )
}
