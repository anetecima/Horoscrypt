import React, { useCallback, useState } from 'react'
import { CommonInput } from '../commonInput'
import { CommonButton } from '../commonButton'

import styled from 'styled-components'
const WrapperStyle = styled.div`
  //align-items: stretch;
  .add-button {
    height: 56px;
  }
`

const RemoveButtonStyle = styled.button`
  background: transparent;
  border: 0;
`
const EmailStyle = styled.div`
  border: solid black 1px;
  border-radius: 3px;
  background: rgba(220, 220, 220, 0.3);
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

  const onRemove = useCallback(
    val => {
      console.log('remove ', value)

      const newVal = value.filter(item => {
        return item !== val
      })

      onChange(newVal)
    },
    [value]
  )

  const onAdd = () => {
    if (localValue.length) {
      const newValue = [...value, localValue]
      onChange(newValue)
      setLocalValue('')
    }
  }

  return (
    <div className="stretch">
      <div className="stretch fl fl-wrap m-t-8">
        {value.map((item, index) => (
          <EmailItem value={item} key={index} onRemove={() => onRemove(item)} />
        ))}
      </div>

      <WrapperStyle className="fl fl-c stretch m-t-8">
        <CommonInput
          onChange={e => setLocalValue(e.target.value)}
          value={localValue}
          label="Email recipients"
          id="emailAddress"
          type="email"
        />

        <CommonButton className="add-button lengthen m-l-8 block" onClick={onAdd}>
          +
        </CommonButton>
      </WrapperStyle>
    </div>
  )
}
