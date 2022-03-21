import React from 'react'

function Header({text, bgColor, textColor}) {
  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor
  }


  return (
    <header style={headerStyle}>
      <h2>{text}</h2>
    </header>
  )
}

export default Header
