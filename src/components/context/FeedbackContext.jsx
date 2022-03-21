import FeedbackData from '../FeedbackData'
import React,{createContext, useState} from 'react'
import {v4 as uuidv4} from 'uuid'


const FeedbackContext = createContext()



export const FeedbackProvider = ({children}) => {
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

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => (
      item.id === id ? {...item, ...updItem} : item
    )))
    setFeedbackEdit({
      item: {},
      edit: false
    })
  }


  return(
    <FeedbackContext.Provider value = {{
      feedback,
      deleteFeedback,
      addFeedback,
      editFeedback,
      updateFeedback,
      feedbackEdit
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext