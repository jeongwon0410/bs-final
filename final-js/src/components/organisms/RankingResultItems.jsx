import styled from 'styled-components'
import imageData from '@components/atoms/image'
import RankingItem from '@components/molecules/RankingItem'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { useState } from 'react'
import * as colors from '@styles/colors'
import RankingResultitem from '@components/molecules/RankingResultitem'
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: orange;
`
const Items = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
`

const Collection = styled.div`
  border-bottom: 1px solid ${colors.borderSecondary};
`

function RankingResultItems(props) {
  const { list } = props
  return (
    <Container>
      <Items>
        {list.map((data, index) => (
          <Collection key={data.index}>
            <RankingResultitem item={data} index={index} />
          </Collection>
        ))}
      </Items>
    </Container>
  )
}

export default RankingResultItems
