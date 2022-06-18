import React, { useCallback, useState } from 'react'
import { CommonButton } from '../commonButton'
import { CommonInput } from '../commonInput'
import FormWrapper from '../formWrapper'
import { RecipientInput } from './recipientsInput'
import { LoaderOverlay } from '../loaderOverlay'

import styled from 'styled-components'
import { mediaSmUp } from '../theme/media'

import dynamic from 'next/dynamic'
const HtmlEditor = dynamic(() => import('../htmlEditor').then(mod => mod.HtmlEditor) as never, {
  ssr: false
})

const WrapperStyle = styled.div`
  width: 100%;
  max-width: 850px;
  overflow: hidden;

  .first-wrapper {
    max-width: 500px;
    min-height: 100vh;
  }

  .second-wrapper {
    ${mediaSmUp} {
      padding-top: 50px;
    }
  }

  .ql-container {
    min-height: 300px;
  }
`

export const FormInputs = () => {
  const [link, setLink] = useState('')
  const [isLinkError, setIsLinkError] = useState(false)
  const [emailContent, setEmailContent] = useState('')
  const [recipients, setRecipients] = useState([])
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const onClick = () => {
    if (link.length > 8) {
      //submit
      setStep(1)
    } else {
      setIsLinkError(true)
    }
  }

  const onLinkChange = e => {
    setIsLinkError(false)
    setLink(e.target.value)
  }

  const onContentChange = useCallback(newVal => {
    setEmailContent(newVal)
  }, [])

  return (
    <WrapperStyle className="block-center t-center">
      {isLoading && <LoaderOverlay />}

      {step === 0 && (
        <div className="first-wrapper stretch lengthen fl-c block-center">
          <FormWrapper className="z-i-3 stretch fl-col p-20-20">
            <div className="t-bold f-s-16 m-b-12">Enter the link to your meeting recording!</div>

            <CommonInput
              onChange={onLinkChange}
              value={link}
              error={isLinkError}
              label="Video link"
              type="text"
              helperText={isLinkError && 'Please insert a link'}
            />

            <CommonButton className="stretch m-t-20" onClick={onClick}>
              NEXT
            </CommonButton>
          </FormWrapper>
        </div>
      )}

      {step === 1 && (
        <div className="second-wrapper z-i-3 stretch fl-c fl-col p-20-20">
          {/*/ @ts-ignore*/}
          <HtmlEditor value={emailContent} onChange={onContentChange} />

          <RecipientInput onChange={val => setRecipients(val)} value={recipients} />

          <div className="fl stretch m-t-20">
            <CommonButton onClick={() => setStep(0)} className="stretch m-r-12">
              BACK
            </CommonButton>

            <CommonButton className="stretch">SEND</CommonButton>
          </div>
        </div>
      )}
    </WrapperStyle>
  )
}
