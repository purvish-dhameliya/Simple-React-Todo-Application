import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

const ButtonField = ({ label, handleClick, variant, ...rest }) => {
  const button = {
    padding: '1rem',
    margin: '1rem'
  }
  return (
    <Button variant={variant} style={button} onClick={handleClick} {...rest}>
      {label}
    </Button>
  )
}

export default ButtonField
