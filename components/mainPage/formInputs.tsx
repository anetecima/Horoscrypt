import React, { useState } from 'react'
import { CommonButton } from '../commonButton'
import { CommonInput } from '../commonInput'
import styled from 'styled-components'
import FormWrapper from '../formWrapper'
import { RecipientInput } from './recipientsInput'

const WrapperStyle = styled.div`
  position: relative;
  width: 100%;
  max-width: 850px;
  overflow: hidden;
`
const InnerWrapperStyle = styled.div`
  position: relative;
  width: 200%;
  max-width: 1700px;
  transition: left 0.3s linear;

  &.first-step {
    left: 0;
  }

  &.second-step {
    left: -100%;
  }
`

export const FormInputs = () => {
  const [link, setLink] = useState('')
  const [emilContent, setEmailContent] = useState('')
  const [recipients, setRecipients] = useState([])
  const [step, setStep] = useState(1)

  return (
    <WrapperStyle className="text-center fl">
      <InnerWrapperStyle
        className={'fl fl-shrink-0 ' + (step === 0 ? 'first-step' : 'second-step')}
      >
        <FormWrapper className="z-i-3 stretch fl-c fl-col p-20-20">
          <div className="t-bold f-s-16 c-white m-b-12">
            Enter the link to your meeting recording!
          </div>

          <CommonInput
            onChange={e => setLink(e.target.value)}
            value={link}
            label="Video link"
            type="text"
          />

          <CommonButton className="stretch m-t-20" onClick={() => setStep(1)}>
            NEXT
          </CommonButton>
        </FormWrapper>

        <FormWrapper className="z-i-3 stretch fl-c fl-col p-20-20">
          <CommonInput
            multiline
            onChange={val => setEmailContent(val.target.value)}
            value={emilContent}
            label="Email content"
            type="text"
            className="m-b-8"
          />

          <RecipientInput onChange={val => setRecipients(val)} value={recipients} />

          <div className="fl stretch m-t-20">
            <CommonButton onClick={() => setStep(0)} className="stretch m-r-12">
              BACK
            </CommonButton>

            <CommonButton className="stretch">SEND</CommonButton>
          </div>
        </FormWrapper>
      </InnerWrapperStyle>
    </WrapperStyle>
  )
}
