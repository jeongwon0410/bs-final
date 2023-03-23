import styled, { keyframes } from 'styled-components'
// import imageData from '@components/atoms/image'
import { useState } from 'react'
import { useEffect } from 'react'
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from '@components/atoms/firebase'
import CircularProgress from '@mui/material/CircularProgress'
import image1 from '@assets/images/1.png'
import image2 from '@assets/images/2.png'
import image3 from '@assets/images/3.png'
import image4 from '@assets/images/4.png'
import image5 from '@assets/images/5.png'
import image6 from '@assets/images/6.png'
import image7 from '@assets/images/7.png'
import image8 from '@assets/images/8.png'
import image9 from '@assets/images/9.png'
import image10 from '@assets/images/10.png'

const ImageAni1 = keyframes`

from {
    left: 0px;
  }
  to {
    left: -4200px;
  }
`

const ImageAni2 = keyframes`
  from {
    left: 4200px;
  }
  to {
    left: 0px;
  }

`

const Container = styled.div`
  overflow-x: hidden;
  position: relative;

  height: 500px;
  width: 100%;
`
const Element1 = styled.div`
  position: absolute;
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: row;
  left: 0px;

  animation: ${ImageAni1} 20s 1s linear infinite;
`

const Element2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: row;
  left: 0px;
  animation: ${ImageAni2} 20s 1s linear infinite;
`

const CardImage = styled.img`
  border-radius: 16px;
  width: 400px;
  height: 400px;
  /* object-fit: contain;
  vertical-align: middle; */
  margin-left: 15px;
  margin-top: 20px;
  /* flex-shrink: 0; */
`
const Title = styled.div`
  font-family: HBIOS-SYS;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
`
function Items() {
  const [imgUrl, setImgUrl] = useState([])
  const [loading, setLoading] = useState(false)

  const img = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ]
  // useEffect(() => {
  //   setLoading(true)
  //   const listRef = ref(storage, 'nftImages')
  //   const arr = []
  //   listAll(listRef)
  //     .then((res) => {
  //       res.items.forEach((itemRef) => {
  //         getDownloadURL(ref(storage, itemRef._location.path_))
  //           .then((url) => {
  //             arr.push(url)
  //           })
  //           .then(() => {
  //             setImgUrl(arr)
  //           })
  //           .catch((error) => {
  //             // Handle any errors
  //           })
  //       })
  //     })

  //     .catch((error) => {
  //       // Uh-oh, an error occurred!
  //     })

  //   const id = setTimeout(() => {
  //     setLoading(false)
  //   }, 2000)
  //   return () => {
  //     clearTimeout(id)
  //   }
  // }, [])

  return (
    <Container>
      <Title>판매중인 아이템</Title>
      {/* {loading ? (
        <center>
          <CircularProgress
            color="error"
            style={{ width: '100px', height: '100px' }}
          />
          <Title>waiting...</Title>
        </center>
      ) : (
        <> */}
      <Element1>
        {img.map((data, index) => (
          <CardImage key={index} src={data}></CardImage>
        ))}
      </Element1>
      <Element2>
        {img.map((data, index) => (
          <CardImage key={index} src={data}></CardImage>
        ))}
      </Element2>
      {/* </>
      )} */}
    </Container>
  )
}

export default Items
