import styled from 'styled-components'
import * as colors from '@styles/colors'
import MetaMaskImg from '@assets/images/metamask.png'
import DiscordImg from '@assets/images/discord.png'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Alert from '@mui/material/Alert'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  owner,
  contract,
  aaa,
  bbb,
  erc20_contract,
} from '@components/atoms/common'
import AdminDialog from '@components/organisms/AdminDialog'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@components/atoms/firebase'
// import useAuth from '@hooks/useAuth'
import logo from '@assets/images/logo.png'
import { useCallback } from 'react'
const Container = styled.header`
  width: 100%;
  height: 85px;
  position: fixed;
  top: 0px;
  display: flex;
  padding: 0px 16px;
  align-items: center;
  z-index: 999;
  background-color: white;
`

const TextBox = styled.div`
  margin-top: 10px;
  height: 80px;
  width: 100%;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
`

const GrayRoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  /* background-color: ${colors.bgSecondary}; */
`

const WalletBox = styled(GrayRoundBox)`
  /* margin-left: auto; */
  background-color: ${colors.darkslategray};
  margin-right: ${(props) => (props.setting ? 8 : 30)}px;
  /* margin-right: 8px; */
  cursor: pointer;
`

const DiscordBox = styled(GrayRoundBox)`
  margin-left: auto;
  background-color: ${colors.mediumblue};
  margin-right: 8px;
  cursor: pointer;
`

const SettingBox = styled(GrayRoundBox)`
  margin-right: 50px;
  cursor: pointer;
`

const MetaMaskImage = styled.img`
  width: 30px;
  height: 30px;
`

const DiscordImage = styled.img`
  width: 25px;
  height: 20px;
`

const TextArea = styled.div`
  width: 80%;
  color: ${colors.bgBlack};
  font-family: HBIOS-SYS;
  font-size: 20px;
  margin-bottom: 5px;
`

const LogoImage = styled.img`
  width: 30px;
  height: 50px;
  margin-right:10px;
  /* margin-right: ${(props) => (props.setting ? 8 : 30)}px; */
  /* margin-left: auto; */
  /* margin-right: 20px; */
`

function Header(props) {
  const {
    connect,
    account,
    nft,
    voteNft,
    setting,
    login,
    error,
    setError,
  } = props

  const [open, setOpen] = useState(false)

  // const checkNFT = useCallback(async (acc) => {
  //   const voter = await contract.methods.getVoter(acc).call()
  //   const amount = await erc20_contract.methods.balanceOf(acc).call()
  //   setNft(amount)
  //   const voterNftInt = parseInt(voter.originNft)
  //   const nftInt = parseInt(amount)
  //   if (voterNftInt === nftInt) {
  //     setVoteNft(voter.nft)
  //   } else if (voterNftInt < nftInt) {
  //     setVoteNft(parseInt(voter.nft) + (nftInt - voterNftInt))
  //   } else if (voterNftInt > nftInt) {
  //     setVoteNft(parseInt(voter.nft) - (voterNftInt - nftInt))
  //   }
  // }, [])

  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on('accountsChanged', (account) => {
  //       setAccount(account[0])
  //       checkNFT(account[0])
  //       if (account[0].toUpperCase() === owner.toUpperCase()) {
  //         setSetting(true)
  //       } else {
  //         setSetting(false)
  //       }
  //     })
  //   }
  // }, [setAccount, checkNFT])

  // const connect = async () => {
  //   if (window.ethereum) {
  //     try {
  //       const res = await window.ethereum.request({
  //         method: 'eth_requestAccounts',
  //       })
  //       setAccount(res[0])
  //       checkNFT(res[0])
  //       if (res[0].toUpperCase() === owner.toUpperCase()) {
  //         setSetting(true)
  //       } else {
  //         setSetting(false)
  //       }
  //     } catch (err) {
  //       setAccount('')
  //     }
  //   } else {
  //     setError(true)
  //   }
  // }

  // const login = async () => {
  //   try {
  //     const { user } = await signInWithEmailAndPassword(auth, aaa, bbb)
  //     setUid(user.uid)
  //   } catch ({ code, message }) {}
  // }

  const handleClick = () => {
    connect()

    login()
  }

  const handleOpen = (e) => {
    setOpen(true)
  }

  return (
    <Container>
      <LogoImage src={logo} />
      {account === '' ? (
        <TextArea>지갑 연결!!!</TextArea>
      ) : (
        <TextBox>
          <TextArea>지갑 주소 : {account}</TextArea>
          <TextArea>내 nft : {nft} </TextArea>
          <TextArea>투표 가능 : {voteNft}</TextArea>
        </TextBox>
      )}

      <DiscordBox>
        <DiscordImage
          src={DiscordImg}
          onClick={() =>  window.open("https://discord.gg/gakqNPsu", "_blank")}
        />
      </DiscordBox>
      <WalletBox setting={setting}>
        <MetaMaskImage src={MetaMaskImg} onClick={handleClick} />
      </WalletBox>

      {setting ? (
        <SettingBox>
          <SettingsIcon onClick={handleOpen} />
        </SettingBox>
      ) : null}
      {error ? (
        <Alert severity="error" onClose={() => setError(false)}>
          Install MetaMask
        </Alert>
      ) : null}
      <AdminDialog open={open} setOpen={setOpen} account={account} />
    </Container>
  )
}

export default Header
