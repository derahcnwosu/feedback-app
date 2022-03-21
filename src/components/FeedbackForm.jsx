import React, {useContext, useEffect, useState} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from './context/FeedbackContext'

function FeedbackForm() {
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])


  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState(null)
  const [rating, setRating] = useState(10)

  const handleChange = (e) => {
    if(text.length === 0) {
      setBtnDisabled(true)
      setMessage('')
    } else if(!text || text.length <= 10) {
      setBtnDisabled(true)
      setMessage('Must be more than 10 characters')
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    setText(e.target.value)
  }


  const handleSubmit = (e) => {
    if(text.trim().length > 10) {

      const newFeedback = {
        text,
        rating
      }

      if(feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setText('')
    }


    e.preventDefault()
    
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our products?</h2>
        <div className="input-group">
          <input type="text" onChange={handleChange} value={text}/>
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
        <RatingSelect select={(rating) => setRating(rating)}/>
      </form>
    </Card>
  )
}

export default FeedbackForm
