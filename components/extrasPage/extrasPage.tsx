import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { LoaderOverlay } from '../loaderOverlay'
import { mediaMdUp, mediaSmUp } from '../theme/media'

const WrapperStyle = styled.div`
  max-width: 1200px;
`

const VideoStyle = styled.video`
  width: 100%;
  max-width: 850px;
`
const TranscriptStyle = styled.div`
  ${mediaMdUp} {
    width: 300px;
  }
`
const InnerWrapperStyle = styled.div`
  flex-direction: column;
  ${mediaMdUp} {
    flex-direction: row;
  }
`
const TextStyle = styled.div`
  &:hover {
    background: yellow;
  }
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

  useEffect(() => {
    if (file) {
      const track = videoRef.current?.addTextTrack('captions', 'Captions', 'en')
      track.mode = 'showing'
      trackRef.current.src = file
      // sorry :(
      setTimeout(() => setCues(videoRef.current.textTracks[0].cues), 10)
    }
  }, [file])

  const onFileUpload = useCallback(e => {
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

      <InnerWrapperStyle className="fl fl-a-s">
        <VideoStyle className="p-20-20" controls preload="metadata" ref={videoRef}>
          <source src="/video-0.mp4#t=0.001" type="video/mp4" />
          <track
            onLoad={e => console.log(e)}
            ref={trackRef}
            // src="/output.vtt"
            kind="subtitles"
            srcLang="en"
            label="english"
            default
          />
          Your browser does not support videos.
        </VideoStyle>

        <TranscriptStyle className="fl-shrink-0 p-20-20">
          {cues.length
            ? [...Array(cues.length)].map((item, index) => {
                return (
                  <TextStyle
                    className="pos-rlt fl fl-j-sb f-s-16 p-8-0 bg-white transition"
                    key={index}
                  >
                    {/*@ts-ignore*/}
                    <div>{cues?.[index]?.text}</div>

                    <div className=" f-s-16 f-s-12 m-l-20">{cues?.[index]?.startTime}</div>
                  </TextStyle>
                )
              })
            : null}
        </TranscriptStyle>
      </InnerWrapperStyle>
    </WrapperStyle>
  )
}
