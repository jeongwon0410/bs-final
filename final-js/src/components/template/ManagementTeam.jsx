import styled from 'styled-components'
import image1 from '@assets/images/image1.png'
import image2 from '@assets/images/image2.png'
import image3 from '@assets/images/image3.png'
const Container = styled.div`
  width: 100%;
  height: 700px;
  /* margin-top: 10px; */
  background-color: black;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ImageArea = styled.div`
  /* margin-top: 50px; */
  width: 80%;
  /* height: 70%; */
  /* height: 200px; */
  display: grid;
  /* background-color: red; */
  grid-template-columns: repeat(3, 1fr);
  gap: 10%;
  margin-top: 50px;
`

const ImageCustom = styled.img`
  width: 100%;
  height: 400px;
`

const TextArea = styled.div`
  font-family: HBIOS-SYS;
  font-size: 100px;
  /* margin-top: 100px; */
  color: white;
`
const ImgText = styled.div`
  font-family: HBIOS-SYS;
  font-size: 50px;
  /* margin-top: 100px; */
  color: white;
`

const SubText = styled.div`
  font-family: HBIOS-SYS;
  font-size: 25px;
  /* margin-top: 100px; */
  color: white;
  float: right;
`

const TextBox = styled.div`
  display: flex;
`

function ManagementTeam() {
  return (
    <Container>
      <TextArea>운영진</TextArea>
      <ImageArea>
        <div>
          <ImageCustom src={image1} />
          <ImgText>0 </ImgText>
          <TextBox>
            <ImgText>어드바이저</ImgText>
            <SubText>COO,CFO</SubText>
          </TextBox>
        </div>
        <div>
          <ImageCustom src={image3} />
          <ImgText>ONE</ImgText>
          <TextBox>
            <ImgText>개발자</ImgText>
            <SubText>CPO,CTO</SubText>
          </TextBox>
        </div>
        <div>
          <ImageCustom src={image2} />
          <ImgText>LEE</ImgText>
          <TextBox>
            <ImgText>디자인</ImgText>
            <SubText>CEO,CCO</SubText>
          </TextBox>
        </div>
      </ImageArea>
    </Container>
  )
}

export default ManagementTeam
