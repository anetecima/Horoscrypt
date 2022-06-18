import React from 'react'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import styled from 'styled-components'

const StyledInput = styled(TextField)`
  background: white;

  .MuiInputBase-multiline {
    min-height: 200px;
  }

  .MuiInputBase-root,
  .MuiFormLabel-root {
    color: black !important;
  }
  
  .MuiInputBase-input {
    background: white;
  }
  
  .MuiOutlinedInput-notchedOutline {
    border-color: black !important;
  }
`

export const CommonInput = ({ className = '', ...props }: TextFieldProps) => (
  <StyledInput className={'stretch ' + className} {...props} variant="outlined" />
)
