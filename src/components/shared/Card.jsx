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
