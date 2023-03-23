import { Button } from '@mui/material'
import styled, { keyframes } from 'styled-components'
import image6 from '@assets/images/6.png'
const Ball = keyframes`

0% {
    top:0px;
  }
  95% {
    width: 100px;
  }
  to {
    top:300px;
    width:115px;
    height:90px
  } 
`

const Container = styled.div`
  width: 100%;
  height: 648px;
  background-color: blue;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TextArea = styled.div`
  width: 80%;
  color: white;
  font-family: HBIOS-SYS;
  font-size: 20px;
  line-height: 2;
  float: left;
`

const ButtonArea = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const ButtonCustom = styled.button`
  cursor: pointer;
  width: 200px;
  height: 100px;
  background-color: beige;
  font-family: HBIOS-SYS;
  border-color: beige;
  border-radius: 5px;
  font-size: 50px;
  margin-right: 100px;
  margin-left: 100px;
`

const Test = styled.img`
  position: relative;
  margin-left: 30px;
  margin-right: 100px;
  // right: 700px;
  // left: 850px;
  /* bottom: 50px; */
  /* top: 50px; */
  width: 100px;
  height: 100px;

  border-radius: 50%;
  background: #000;
  animation: ${Ball} 1s ease-in Infinite Alternate;
  float: left;
`

function Explain() {
  return (
    <Container>
      <div>
        <Test src={image6} />

        <TextArea>
          대부분의 사람들은 대중적인것을 쫓습니다.
          <br /> 유명한 책, 유명한 음악, 단지 유명하다는 이유로 많은 사람들이
          그것을 옹호하고 좋아하는 경우를 많이 봅니다. 여러분들은 그런적이
          없으셨나요? 나다움을 나타낼수있는 공간, 내 이야기를 하는것처럼 나를
          위로해주는 노래, 스스로 솔직하게 쓸수있는 일기와 나만의 그림들
          일반적이지 않은것들에게 마음이 가게 되는 경우 말입니다. <br />
          <br />
          시밀레는 그런 알려지지 않은 자신만의 것을 함께 나누는 공간입니다
        </TextArea>
      </div>
    </Container>
  )
}

export default Explain
