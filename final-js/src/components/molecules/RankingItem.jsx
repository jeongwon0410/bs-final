import styled from 'styled-components'
import * as colors from '@styles/colors'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useState } from 'react'
import Chip from '@mui/material/Chip'
// import Stack from '@mui/material/Stack'
import { useEffect } from 'react'
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from '@components/atoms/firebase'
import { Tooltip } from '@mui/material'

const CollectionInfo = styled.div`
  display: flex;
  align-items: center;
  height: 110px;
`

const Thumbnail = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  /* margin-left: 24px; */
  border-style: solid;
  border-width: medium;
  background-color: ${colors.bgSecondary};
  /* object-fit: contain; */
`

const Stack = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  row-gap: 20px;
  /* grid-template-rows: repeat(2, 1fr); */
  /* height: 110px; */
`

const Stack1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row-start: 1;
  grid-row-end: 3;
  /* width: 100px; */
`
const Stack3 = styled.div`
  display: flex;
  align-items: center;
  grid-column-start: 2;
  grid-column-end: 4;
  width: 400px;
`
const Stack2 = styled.div`
  display: flex;
  align-items: center;
  grid-column-start: 2;
  grid-column-end: 4;
  column-gap: 20px;
  /* justify-content: center; */
  /* column-gap: 20px;*/

  width: 190px;
`

const Title = styled.div`
  font-family: HBIOS-SYS;
  font-size: 30px;
  color: ${colors.redColor};
  /* margin-left: 20px; */
  margin-left: 50px;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
`
function RankingItem({ item }) {
  const [imgUrl, setImgUrl] = useState('')
  useEffect(() => {
    const getUrl = async () => {
      getDownloadURL(ref(storage, item.imgUrl))
        .then((url) => {
          setImgUrl(url)
        })
        .catch((error) => {
          // Handle any errors
        })
    }

    if (item.imgUrl !== '') {
      getUrl()
    }
  }, [item])
  return (
    <CollectionInfo>
      <Stack>
        <Stack1>{imgUrl !== '' ? <Thumbnail src={imgUrl} /> : null}</Stack1>
        <Stack2>
          {item.nickName !== '' ? (
            <Tooltip title={item.nickName}>
              <Chip
                label={item.nickName}
                sx={{
                  fontFamily: 'HBIOS-SYS',
                  fontWeight: 500,
                  fontSize: '30px',
                }}
              />
            </Tooltip>
          ) : null}
          {item.comment !== '' ? (
            <Tooltip title={item.comment}>
              <Chip
                label={item.comment}
                sx={{
                  fontFamily: 'HBIOS-SYS',
                  fontWeight: 500,
                  fontSize: '30px',
                }}
              />
            </Tooltip>
          ) : null}
        </Stack2>
        <Stack3>
          {item.url !== '' ? (
            <Tooltip title={item.url}>
              <Chip
                label={item.url}
                sx={{
                  fontFamily: 'HBIOS-SYS',
                  fontWeight: 500,
                  fontSize: '30px',
                }}
                onClick={() => window.open(item.url, '_blank')}
              />
            </Tooltip>
          ) : null}
        </Stack3>
      </Stack>
      <Title>{item.point}</Title>
    </CollectionInfo>
  )
}

export default RankingItem
