import React, { useCallback, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const StyledInput = styled(TextField)`
  .MuiInputBase-root,
  .MuiFormLabel-root {
    color: white !important;
  }

  //.MuiInput-underline:before,
  //.MuiInput-underline:after,
  .MuiOutlinedInput-notchedOutline {
    border-color: white !important;
  }
`
const WrapperStyle = styled.div`
  max-width: 300px;
`
export const DateInput = () => {
  const [date, setDate] = useState('')

  const onChange = useCallback(e => {
    setDate(e.target.value)
  }, [])

  return (
    <WrapperStyle className="p-30-30">
      <form className="z-i-3">
        <StyledInput
          onChange={onChange}
          value={date}
          className="stretch"
          id="birth-date"
          label="Enter your birthdate"
          type="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    </WrapperStyle>
  )
}
