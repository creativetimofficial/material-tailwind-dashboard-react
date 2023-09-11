import React from 'react'
import TextField from "@mui/material/TextField";

const InputTextUI = ({placeHolder}) => {
  return (
    <TextField 
        id="outlined-basic" 
        label={placeHolder} 
        variant="Outlined" 
    />
  )
}

export default InputTextUI