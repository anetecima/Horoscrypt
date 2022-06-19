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
  const [link, setLink] = useState(
    'https://tartuulikool-my.sharepoint.com/:v:/g/personal/karlmv_ut_ee/Eb_w5Gj4N0lIv3sIgmalcjQBWjktodUT3JRiO3GWkRAqCw?e=YfASkt'
  )
  const [isLinkError, setIsLinkError] = useState(false)
  const [emailContent, setEmailContent] = useState('')
  const [recipients, setRecipients] = useState([
    'karl-martin.voovere@ut.ee>',
    'anete.cima@gmail.com',
    'eyupcandenizyilmaz@gmail.com',
    'rastockymatej@gmail.com',
    'beijate@gmail.com'
  ])

  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [smartFields, setSmartFields] = useState('')

   const onLinkChange = e => {
    setIsLinkError(false)
    setLink(e.target.value)
  }

  const analyseVideo = () => {
    setIsLoading(true)
    console.log('lets analyse the video')

    fetch('http://0.0.0.0:3001/v1/api/start-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link })
    })
      .then(res => res.body)
      .then(body => {
        const reader = body.getReader()
        return new ReadableStream({
          start(controller) {
            return pump()
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close()
                } else {
                  controller.enqueue(value)
                  return pump()
                }
              })
            }
          }
        })
      })
      .then(stream => new Response(stream))
      .then(res => res.blob())
      .then(blob => {
        let reader = new FileReader()
        setIsLoading(false)

        reader.onload = event => {
          const result = JSON.parse(event.target.result)
          setSmartFields(result)
          console.log(smartFields)
          setStep(1)
        }

        reader.readAsText(blob)
      })

    // setIsLoading(false)
    // .then(res => res.json())
    // .then(data => {
    //   console.log('the server responded')
    //   console.log('server responded with', data)
    // })
    // .catch(err => console.error(err))
  }

  const onContentChange = useCallback(newVal => {
    setEmailContent(newVal)
  }, [])

  const onSubmit = () => {
    //SUBMIT AND STUFF
    setStep(2)
  }

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

            <CommonButton className="stretch m-t-20" onClick={analyseVideo}>
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

            <CommonButton onClick={onSubmit} className="stretch">
              SEND
            </CommonButton>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="first-wrapper stretch lengthen fl-c block-center">
          <div className="z-i-3 stretch fl-col p-20-20">
            <h2>THANK YOU! THE MEETING SUMMARY SHOULD BE IN YOUR INBOX SOON!</h2>
            <a
              className="underline pointer"
              onClick={() => {
                setStep(0)
              }}
            >
              Import another video
            </a>
          </div>
        </div>
      )}
    </WrapperStyle>
  )
}
