import React, { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

const ButtonStyle = styled.button`
  color: black;
  border: solid black 1px;
  background: white;
  border-radius: 4px;
  &:hover {
    background: rgb(240, 240, 240);
  }
`
export const CommonButton = ({
  onClick,
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => (
  <ButtonStyle
    onClick={onClick}
    className={'p-12-32 f-s-16 block block-center pointer transition ' + className}
    {...props}
  >
    {children}
  </ButtonStyle>
)
