import React, {useContext} from 'react'
import FeedbackContext from './context/FeedbackContext'


function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)

  const average = feedback.reduce((acc, cur) => (
    acc + cur.rating
  ), 0)/ feedback.length

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Review(s)</h4>
      <h4>Avg. Rating: {isNaN(average) ? 0 : average.toFixed(1)}</h4>
    </div>
  )
}

export default FeedbackStats
