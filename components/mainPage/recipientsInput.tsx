import React, { useCallback, useState } from 'react'
import { CommonInput } from '../commonInput'
import { CommonButton } from '../commonButton'

import styled from 'styled-components'
import { validateEmail } from '../helpers'
const WrapperStyle = styled.div`
  .add-button {
    height: 56px;
  }
`
// Beāte Čīma <beijate@gmail.com>, anete cima <anete.cima@gmail.com>
const RemoveButtonStyle = styled.button`
  background: transparent;
  border: 0;
`
const EmailStyle = styled.div`
  border: solid black 1px;
  border-radius: 3px;
  background: rgb(220, 220, 220);
`

const EmailItem = ({ value, onRemove }) => {
  return (
    <EmailStyle className="c-black fl fl-c p-8-8 m-r-4 m-b-4 m-t-4">
      <div>{value}</div>
      <RemoveButtonStyle className="c-black m-l-8 pointer" onClick={onRemove}>
        X
      </RemoveButtonStyle>
    </EmailStyle>
  )
}

export const RecipientInput = ({ onChange, value = [] }) => {
  const [localValue, setLocalValue] = useState('')
  const [error, setError] = useState<'' | 'repeat' | 'notValid'>('')

  const onRemove = useCallback(
    val => {
      setError('')
      const newVal = value.filter(item => {
        return item !== val
      })

      onChange(newVal)
    },
    [value]
  )

  const onAdd = useCallback(() => {
    if (value.includes(localValue)) {
      setError('repeat')
    } else {
      if (!validateEmail(localValue)) {
        setError('notValid')
      } else {
        if (localValue.length) {
          const newValue = [...value, localValue]
          onChange(newValue)
          setLocalValue('')
        }
      }
    }
  }, [localValue])

  const onInputChange = e => {
    setError('')
    setLocalValue(e.target.value)
  }

  return (
    <div className="stretch">
      <div className="stretch fl fl-wrap m-t-8">
        {value.map((item, index) => (
          <EmailItem value={item} key={index} onRemove={() => onRemove(item)} />
        ))}
      </div>

      <WrapperStyle className="fl stretch m-t-8">
        <CommonInput
          onChange={onInputChange}
          value={localValue}
          label="Email recipients"
          id="emailAddress"
          type="email"
          error={error.length > 0}
          helperText={
            error === 'notValid'
              ? 'Please insert a valid email address'
              : error === 'repeat'
              ? 'This email has already been added'
              : ''
          }
        />

        <CommonButton className="add-button lengthen m-l-8 block" onClick={onAdd}>
          +
        </CommonButton>
      </WrapperStyle>
    </div>
  )
}
