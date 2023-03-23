import Items from '@components/organisms/Items'
import { useState } from 'react'
import styled from 'styled-components'
import * as colors from '@styles/colors'
import Ranking from '@components/organisms/Ranking'
import AlertDialog from '@components/organisms/AlertDialog'
import RegisterDialog from '@components/organisms/RegisterDialog'
import { contract } from '@components/atoms/common'

// import Alert from '@material-ui/lab/Alert'

const Container = styled.div`
  width: 100%;
  /* height:590px;  */
  height:100%;
  /* height: ${(props) => (props.flag ? 1300 : 590)}px; */
  background-color: ${colors.dodgerblueColor};
`

const Title = styled.div`
  font-family: HBIOS-SYS;
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
`

const Button = styled.button`
  margin-top: 10px;
  width: 100px;
  height: 50px;
  margin-left: 30px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${colors.greenColor};
  font-family: HBIOS-SYS;
  font-size: 15px;
`

function GalleryNFT(props) {
  const { account, setLoading, uid, checkNFT } = props
  const [on, setOn] = useState(false)
  const [open, setOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [check, setCheck] = useState(0)
  const [list, setList] = useState([])
  const getCandidate = async () => {
    setList(await contract.methods.getCandidate().call())
  }
  return (
    <Container flag={on}>
      <Items />

      <Ranking
        on={on}
        setOn={setOn}
        setOpen={setOpen}
        setRegisterOpen={setRegisterOpen}
        check={check}
        setCheck={setCheck}
        account={account}
        uid={uid}
        getCandidate={getCandidate}
        list={list}
        setLoading={setLoading}
      />
      <AlertDialog
        open={open}
        setOpen={setOpen}
        check={check}
        account={account}
        setLoading={setLoading}
        checkMainNFT={checkNFT}
        getCandidate={getCandidate}
      />
      <RegisterDialog
        open={registerOpen}
        setOpen={setRegisterOpen}
        account={account}
        setLoading={setLoading}
      />
    </Container>
  )
}

export default GalleryNFT
