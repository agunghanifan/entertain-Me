import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Form, Button } from 'react-bootstrap'

export default function FormMovies() {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [poster_path, setPosterPath] = useState('')
  const [popularity, setPopularity] = useState(0)

  function submitButton (e) {
    e.preventDefault()
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
      <Form onSubmit={(e) => submitButton(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Overview</Form.Label>
          <Form.Control type="text" placeholder="Enter overview" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Poster Path</Form.Label>
          <Form.Control type="url" placeholder="Enter url" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Popularity</Form.Label>
          <Form.Control type="number" min="0" max="5" placeholder="Enter Popularity" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Add Tags</Form.Label>
          <Form.Control type="text" min="0" max="5" placeholder="Enter Tags" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    </div>
  )
}
