import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
const PageStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
`

export const MainPage = () => {
  const canvasRef = useRef(null)
  let ctx

  const stars = []
  const maxCount = 200

  const resizeCanvas = () => {
    canvasRef.current.width = document.body.clientWidth
    canvasRef.current.height = document.body.clientHeight
  }

  const drawCircle = (ctx, x, y, radius, fill, stroke, strokeWidth) => {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)

    if (fill) {
      ctx.fillStyle = fill
      ctx.fill()
    }

    if (stroke) {
      ctx.lineWidth = strokeWidth
      ctx.strokeStyle = stroke
      ctx.stroke()
    }
  }

  const loop = () => {
    if (stars.length < maxCount) {
      stars.push({
        x: canvasRef?.current.width / 2,
        y: canvasRef?.current.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        d: 0,
        s: 2
      })
    }

    ctx.fillStyle = '#000'
    ctx.globalAlpha = 0.2
    ctx.fillRect(0, 0, canvasRef?.current.width, canvasRef?.current.height)
    ctx.globalAlpha = 1

    stars.forEach(star => {
      ctx.globalAlpha = Math.min(star.d, 1)

      drawCircle(ctx, star.x, star.y, star.s * star.d, '#fff', '#000', 0)

      ctx.globalAlpha = 1

      star.x += star.vx * star.d
      star.y += star.vy * star.d
      star.d += 0.01

      if (
          star.x < 0 ||
          star.x > canvasRef?.current.width ||
          star.y < 0 ||
          star.y > canvasRef?.current.height
      ) {
        star.x = canvasRef?.current.width / 2
        star.y = canvasRef?.current.height / 2
        star.d = 0
      }
    })

    requestAnimationFrame(loop)
  }

  useEffect(() => {
    ctx = canvasRef?.current?.getContext('2d')
    loop()
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, false)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
      <PageStyle>
        <canvas ref={canvasRef} />
      </PageStyle>
  )
}
