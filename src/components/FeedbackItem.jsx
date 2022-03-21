import React, {useContext} from 'react'
import Card from './shared/Card'
import {FaTimes, FaEdit} from 'react-icons/fa'
import FeedbackContext from './context/FeedbackContext'

function FeedbackItem({item}) {
  const {deleteFeedback, editFeedback} = useContext(FeedbackContext)
  return (
    <Card darkMode={true}>
      <div className="num-display">{item.rating}</div>
      <button className="edit" onClick = {() => editFeedback(item)} ><FaEdit color='#fff'/></button>
      <button className="close" onClick={()=> deleteFeedback(item.id)}><FaTimes color='#fff'/></button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

export default FeedbackItem
