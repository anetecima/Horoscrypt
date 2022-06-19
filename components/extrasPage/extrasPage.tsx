import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { LoaderOverlay } from '../loaderOverlay'

const WrapperStyle = styled.div`
  max-width: 1200px;
`

const TextStyle = styled.div`
  &:hover {
    background: yellow;
  }
`
const InnerWrapperStyle = styled.div`
  width: 100%;
  max-width: 850px;
`

export const ExtrasPage = () => {
  const router = useRouter()
  const { hash } = router.query
  const [file, setFile] = useState<any>()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cues, setCues] = useState<TextTrackCueList | []>([])

  const videoRef = useRef<HTMLVideoElement | undefined>()
  const trackRef = useRef<HTMLTrackElement | undefined>()

  // fetch transcript from backend on page load

  useEffect(() => {
    fetch('http://0.0.0.0:5000/v1/api/vtt')
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

        reader.onload = event => {
          console.log(event.target.result)
          const result = event.target.result
          setFile(result)
        }
  
        reader.readAsDataURL(blob)
      })
  }, [])

  useEffect(() => {
    if (file) {
      const track = videoRef.current?.textTracks[0]
      track.mode = 'showing'
      trackRef.current.src = file
      // sorry :(
      setTimeout(() => setCues(videoRef.current.textTracks[0].cues), 10)
    }
  }, [file])

  const onFileUpload = useCallback(e => {
    console.log('here', e.target.files[0])
    setIsError(false)
    setIsLoading(true)

    try {
      const tmpFile = e.target.files[0]
      let reader = new FileReader()

      reader.onload = event => {

        const result = event.target.result
        setFile(result)
      }

      reader.readAsDataURL(tmpFile)
    } catch {
      setIsError(true)
    }

    setIsLoading(false)
  }, [])

  return (
    <WrapperStyle className="pos-rlt block-center">
      {isLoading && <LoaderOverlay />}
      {isError && <div className="f-s-22 c-error">something went wrong, please try again!</div>}
      <input type="file" onChange={onFileUpload} />

      <InnerWrapperStyle>
        <video className="p-20-20 stretch" controls preload="metadata" ref={videoRef}>
          <source src="/video-0.mp4#t=0.001" type="video/mp4" />
          <track
            ref={trackRef}
            // src="/output.vtt"
            kind="subtitles"
            srcLang="en"
            label="english"
            default
          />
          Your browser does not support videos.
        </video>

        <TranscriptStyle className="fl-shrink-0 p-20-20">
          {cues?.length
            ? [...Array(cues.length)].map((item, index) => {
                return (
                  <TextStyle
                    className="pos-rlt fl fl-j-sb f-s-16 p-8-0 bg-white transition pointer"
                    key={index}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                      videoRef.current.currentTime = cues?.[index]?.startTime
                    }}
                  >
                    {/*@ts-ignore*/}
                    <div>{cues?.[index]?.text}</div>

                    <div className=" f-s-16 f-s-12 m-l-20">{cues?.[index]?.startTime}</div>
                  </TextStyle>
                )
              })
            : null}
        </div>
      </InnerWrapperStyle>
    </WrapperStyle>
  )
}
