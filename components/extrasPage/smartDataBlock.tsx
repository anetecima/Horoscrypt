import React from 'react'
import styled from 'styled-components'
import { SatisfactionRate } from './satisfactionRate'
import { mediaMdUp } from '../theme/media'

const BlockStyle = styled.div`
  ${mediaMdUp} {
    max-width: 350px;
  }

  ul {
    padding-left: 20px;
  }
`

const EntityBlock = ({ data }) =>
  data.map((item, index) => (
    <div key={index}>
      {Object.keys(item).map((key, keyIndex) => (
        <div className="" key={keyIndex}>
          <h4 className="m-b-8">{key}</h4>

          <ul className="m-t-4">
            {item[key].map((entity, entityKey) => (
              <li key={entityKey}>{entity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ))

export const SmartDataBlock = ({ data }) => {
  const { satisfactionRate, summary = '', dateTimeEntities = [], eventEntities = [] } = data

  return (
    <BlockStyle className="stretch p-20-20">
      {satisfactionRate ? <SatisfactionRate rate={satisfactionRate} /> : null}

      <h3>{summary}</h3>

      <div>
        <EntityBlock data={dateTimeEntities} />

        <EntityBlock data={eventEntities} />
      </div>
    </BlockStyle>
  )
}
