// APP
import React from 'react'
import { useState } from 'react/cjs/react.development'
import FeedbackList from './components/FeedbackList'
import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import Header from './components/Header'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import AboutPage from './pages/AboutPage'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }
  return (
    <Router>
      <Header text= 'Feedback UI' bgColor= 'rgba(0,0,0,0.4)' textColor= '#ff6a95'/>
      <div className="container">
        <Routes>
          <Route exact path = '/' element = {
            <>
              <FeedbackForm handleAdd={addFeedback}/>
              <FeedbackStats feedback={feedback}/>
              <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
            </>
          }>
          </Route>

          <Route path = '/about' element = {
          <>
            <AboutPage/>
            {/* <FeedbackForm handleAdd={addFeedback}/> */}
          </>
          
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App


// FEEDBACK LIST
import React from 'react'
import FeedbackItem from './FeedbackItem'
import {AnimatePresence, motion} from 'framer-motion'

function FeedbackList({feedback, handleDelete}) {
  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div key={item.id} 
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            transition={{duration: 0.7}}
            exit = {{opacity: 0}}
          
          >
            <FeedbackItem key={item.id} item={item} handleDelete={handleDelete}/>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList


// FEEDBACK ITEM
import React from 'react'
import Card from './shared/Card'
import {FaTimes} from 'react-icons/fa'

function FeedbackItem({item, handleDelete}) {
  return (
    <Card darkMode={true}>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => handleDelete(item.id)}><FaTimes color='#fff'/></button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

export default FeedbackItem


// FEEDBACK FORM
import React from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import { useState } from 'react/cjs/react.development'

function FeedbackForm({handleAdd}) {
  const [text, setText] = useState('')
  const [message, setMessage] = useState(null)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [rating, setRating] = useState(10)

  const handleTextChange = (e) => {
    if(text.length === 0) {
      setMessage(null)
      setBtnDisabled(true)
    } else if(text.length <= 10) {
      setMessage('Must be up to 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }
      handleAdd(newFeedback)
      setText('')
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our products?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className="input-group">
          <input type="text" onChange={handleTextChange} value={text}/>
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm


// FEEDBACK STATS
import React from 'react'

function FeedbackStats({feedback}) {
  let average = feedback.reduce((acc, cur) => (
    acc + cur.rating
  ), 0) / feedback.length
  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Review(s)</h4>
      <h4>Avg. Rating: {isNaN(average) ? 0 : average.toFixed(1)}</h4>
    </div>
  )
}

export default FeedbackStats


// HEADER
import React from 'react'

function Header({text, bgColor, textColor}) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor
  }
  return (
    <header style={headerStyles}>
      <h2>{text}</h2>
    </header>
  )
}

export default Header



// RATING SELECT
import React from 'react'
import { useState } from 'react/cjs/react.development'

function RatingSelect({select}) {
  const [selected, setSelected] = useState(10)

  const handleChange = (e) => {
    setSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
  }
  return (
    <ul className="rating">
      <li>
        <input type="radio" name="rating" id="num1" value= '1' onChange={handleChange} checked = {selected === 1}/>
        <label htmlFor="num1">1</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num2" value= '2' onChange={handleChange} checked = {selected === 2}/>
        <label htmlFor="num2">2</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num3" value= '3' onChange={handleChange} checked = {selected === 3}/>
        <label htmlFor="num3">3</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num4" value= '4' onChange={handleChange} checked = {selected === 4}/>
        <label htmlFor="num4">4</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num5" value= '5' onChange={handleChange} checked = {selected === 5}/>
        <label htmlFor="num5">5</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num6" value= '6' onChange={handleChange} checked = {selected === 6}/>
        <label htmlFor="num6">6</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num7" value= '7' onChange={handleChange} checked = {selected === 7}/>
        <label htmlFor="num7">7</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num8" value= '8' onChange={handleChange} checked = {selected === 8}/>
        <label htmlFor="num8">8</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num9" value= '9' onChange={handleChange} checked = {selected === 9}/>
        <label htmlFor="num9">9</label>
      </li>
      <li>
        <input type="radio" name="rating" id="num10" value= '10' onChange={handleChange} checked = {selected === 10}/>
        <label htmlFor="num10">10</label>
      </li>
    </ul>
  )
}

export default RatingSelect



// CARD
import React from 'react'

function Card({children, darkMode}) {
  return (
    <div className="card" style={{
      backgroundColor: darkMode ? 'rgba(0,0,0,0.4)' : '#fff',
      color: darkMode ? '#fff' : '#444'
    }}>
      {children}
    </div>
  )
}

export default Card


// BUTTON
import React from 'react'

function Button({children, version, type, isDisabled}) {
  return (
    <button className= {`btn btn-${version}`} type={type} disabled = {isDisabled}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDisabled: true
}

export default Button



// ABOUT PAGE
import React from 'react'
import Card from '../components/shared/Card'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h2>About Page Content</h2>
        <p>This is a test page simulating an about page for our feedback app project.</p>
        <a href="/">Go Home</a>
      </div>
    </Card>
  )
}

export default AboutPage
