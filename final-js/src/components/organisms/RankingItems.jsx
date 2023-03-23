import styled from 'styled-components'
import imageData from '@components/atoms/image'
import RankingItem from '@components/molecules/RankingItem'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { useState } from 'react'
import * as colors from '@styles/colors'
import { contract } from '@components/atoms/common'
import { useEffect } from 'react'
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: orange;
`
const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const RadioItems = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  flex-direction: column; */
  /* float: left; */
  display: flex;
  border-bottom: 1px solid ${colors.borderSecondary};
`

function RankingItems(props) {
  const { check, setCheck, list } = props

  const handleChange = (e) => {
    setCheck(e.target.value)
  }

  return (
    <Container>
      <Items>
        {list.map((data) => (
          <RadioItems key={data.index}>
            <Radio
              color="default"
              checked={check === data.index}
              onChange={handleChange}
              value={data.index}
              name="radio"
            />
            <RankingItem item={data} />
          </RadioItems>
        ))}
      </Items>
    </Container>
  )
}

export default RankingItems
