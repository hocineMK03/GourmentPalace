import React from 'react'

const Footer = () => {
  const footerStyle = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
  };
  
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };
  
  const textStyle = {
    margin: 0,
  };
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <p style={textStyle}>© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
