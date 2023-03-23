import styled from 'styled-components'
import logo from '@assets/images/logo.png'
const Container = styled.footer`
  height: 100px;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 100px; */
`

const LogoImage = styled.img`
  width: 70px;
  height: 90px;
  margin-left: auto;
  margin-right: 20px;
`
function Footer() {
  return (
    <Container>
      <LogoImage src={logo} />
    </Container>
  )
}

export default Footer
