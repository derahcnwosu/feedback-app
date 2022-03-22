import React, {useContext} from 'react'
import FeedbackItem from './FeedbackItem'
import {AnimatePresence, motion} from 'framer-motion'
import FeedbackContext from './context/FeedbackContext'

function FeedbackList({handleDelete}) {
  const {feedback} = useContext(FeedbackContext)

  if(feedback.length === 0) {
      return <h4>No Feedbacks Yet!</h4>


  } else {
    return (
      <div className="feedback-list">
        <AnimatePresence>
          {feedback.map((item) => (
            <motion.div 

              key={item.id}
              initial = {{opacity: 0}}
              // animate = {{opacity: 1}}
              transition={{duration: 1}} 
              exit={{opacity: 0}}  
              whileInView = {{opacity: 1}}
              viewport = {{once: true}}
            >

              <FeedbackItem key={item.id} item={item}/>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }
}

export default FeedbackList
