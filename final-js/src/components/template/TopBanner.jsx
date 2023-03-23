import styled from 'styled-components'
const Container = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 80px;
  background-color: green;
  /* margin-top: 50px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const MainText = styled.div`
  font-family: HBIOS-SYS;
  font-size: 200px;
`

const SubText = styled.div`
  font-family: HBIOS-SYS;
  font-size: 30px;
`
//simile
function TopBanner() {
  return (
    <Container>
      <MainText>SIMILE</MainText>
      <SubText>음악을 사랑하는 당신을 위하여</SubText>
    </Container>
  )
}

export default TopBanner
