import GlobalStyle from './GlobalStyle'
import styled from 'styled-components'
import TopBanner from '@components/template/TopBanner'
import Explain from '@components/template/Explain'
import ManagementTeam from '@components/template/ManagementTeam'
import GalleryNFT from '@components/template/GalleryNFT'
import Header from './components/template/Header'
import { useEffect } from 'react'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import { Button } from '@mui/material'
import Footer from '@components/template/Footer'
import { useCallback } from 'react'
import {
  aaa,
  bbb,
  contract,
  erc20_contract,
  owner,
} from '@components/atoms/common'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@components/atoms/firebase'

const Title = styled.div`
  font-family: HBIOS-SYS;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
`
function App() {
  const [account, setAccount] = useState('')
  const [loading, setLoading] = useState(false)
  const [uid, setUid] = useState('')
  const [nft, setNft] = useState(0)
  const [voteNft, setVoteNft] = useState(0)
  const [error, setError] = useState(false)
  const [setting, setSetting] = useState(false)

  const checkNFT = useCallback(async (acc) => {
    const voter = await contract.methods.getVoter(acc).call()
    const amount = await erc20_contract.methods.balanceOf(acc).call()
    setNft(amount)
    const voterNftInt = parseInt(voter.originNft)
    const nftInt = parseInt(amount)
    if (voterNftInt === nftInt) {
      setVoteNft(voter.nft)
    } else if (voterNftInt < nftInt) {
      setVoteNft(parseInt(voter.nft) + (nftInt - voterNftInt))
    } else if (voterNftInt > nftInt) {
      setVoteNft(parseInt(voter.nft) - (voterNftInt - nftInt))
    }
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (account) => {
        setAccount(account[0])
        checkNFT(account[0])
        if (account[0].toUpperCase() === owner.toUpperCase()) {
          setSetting(true)
        } else {
          setSetting(false)
        }
      })
    }
  }, [setAccount, checkNFT])

  const connect = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(res[0])
        checkNFT(res[0])
        if (res[0].toUpperCase() === owner.toUpperCase()) {
          setSetting(true)
        } else {
          setSetting(false)
        }
      } catch (err) {
        setAccount('')
      }
    } else {
      setError(true)
    }
  }

  const login = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, aaa, bbb)
      setUid(user.uid)
    } catch ({ code, message }) {}
  }

  return (
    <>
      <GlobalStyle />
      <Header
        error={error}
        setError={setError}
        setting={setting}
        login={login}
        connect={connect}
        account={account}
        nft={nft}
        voteNft={voteNft}
      />

      <TopBanner />
      <GalleryNFT
        account={account}
        setLoading={setLoading}
        uid={uid}
        checkNFT={checkNFT}
      />
      {/* <Ranking /> */}
      <Explain />

      <ManagementTeam />
      {/* <Footer /> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <center>
          <CircularProgress
            color="error"
            style={{ width: '100px', height: '100px' }}
          />
          <Title>waiting...</Title>
        </center>
      </Backdrop>
    </>
  )
}

export default App
