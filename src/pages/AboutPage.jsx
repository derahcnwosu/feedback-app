import React from 'react'
import Card from '../components/shared/Card'
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
      <h1>About page</h1>
      <Link to="/">Go Back</Link>
    </Card>
  )
}

export default AboutPage
