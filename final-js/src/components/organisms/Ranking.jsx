import Items from '@components/organisms/Items'
import RankingItems from '@components/organisms/RankingItems'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AlertDialog from './AlertDialog'
import * as colors from '@styles/colors'
import RankingResultItems from '@components/organisms/RankingResultItems'
import { contract } from '@components/atoms/common'
import { useEffect } from 'react'
import { getDatabase, ref, onValue, update } from 'firebase/database'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { storage } from '@components/atoms/firebase'

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

const Box = styled.div`
  display: flex;
  margin-left: auto;
  cursor: pointer;
`

function Ranking(props) {
  const {
    on,
    setOn,
    setOpen,
    setRegisterOpen,
    check,
    setCheck,
    account,
    uid,
    getCandidate,
    list,
    setLoading,
  } = props

  const [result, setResult] = useState(true)
  const [text, setText] = useState('결과')
  const [admin, setAdmin] = useState(false)
  // const [list, setList] = useState([])
  const [rankingList, setRankingList] = useState([])
  const db = getDatabase()

  useEffect(() => {
    const getAdmin = async () => {
      const admin = await contract.methods.getAdmin().call()
      let flag = false
      for (const iterator of admin) {
        if (iterator.toUpperCase() === account.toUpperCase()) {
          setAdmin(true)
          flag = true
        }
      }
      if (flag === false) {
        setAdmin(false)
      }
    }

    getAdmin()
  }, [account])

  useEffect(() => {
    getCandidate()
  }, [])

  useEffect(() => {
    if (result === true) {
      const getRanking = () => {
        const tempArr = [...list]

        for (let i = 0; i < tempArr.length - 1; i++) {
          for (let j = i + 1; j < tempArr.length; j++) {
            if (tempArr[i].point < tempArr[j].point) {
              const temp = tempArr[i]
              tempArr[i] = tempArr[j]
              tempArr[j] = temp
            }
          }
        }

        setRankingList(tempArr)
      }
      getRanking()
    }
  }, [list, result])

  useEffect(() => {
    const readPost = () => {
      onValue(
        ref(db, '/posts/' + uid),
        (snapshot) => {
          setResult(snapshot.val().flag)
        },
        {
          onlyOnce: true,
        },
      )
    }
    if (account !== '') {
      readPost()
    }
  }, [db, uid, account])

  const handleChange = () => {
    if (list.length > 0 && account !== '') {
      setOn(!on)
    }
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
    setOpen(true)
  }

  const handleButtonRegisterClick = (e) => {
    e.stopPropagation()
    setRegisterOpen(true)
  }

  const handleButtonResultClick = (e) => {
    e.stopPropagation()
    getCandidate()
    if (result === true) {
      updatePost(false)
      setResult(false)
      setText('결과')
    } else {
      updatePost(true)
      setResult(true)
      setText('투표')
    }
  }

  const updatePost = (result) => {
    const updates = {}

    // A post entry.
    const postData = {
      flag: result,
    }

    updates['/posts/' + uid] = postData

    return update(ref(db), updates)
  }

  // const getCandidate = async () => {
  //   setList(await contract.methods.getCandidate().call())
  // }

  const handleRefreshButtonClick = (e) => {
    e.stopPropagation()
    getCandidate()
  }

  const handleClickInit = async (e) => {
    e.stopPropagation()
    setLoading(true)
    try {
      await contract.methods.init().send({ from: account })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const deleteStorageImg = async (e) => {
    // try {
    //   await list.forEach((item) => {
    //     const rootRef = ref(storage, item.imgUrl)
    //     deleteObject(rootRef)
    //   })
    // } catch (error) {}
    e.stopPropagation()
    try {
      const storageRef = ref(storage, 'userImages/aa') //ref storage로 바꿔야 함 ..
      // console.log(storageRef)
      // await deleteObject(storageRef)
      // alert('성공적으로 업로드 되었습니다')
    } catch (err) {
      alert('이미지 업로드에 실패하였습니다')
    }
  }

  return (
    <Accordion
      style={{ backgroundColor: `${colors.dodgerblueColor}` }}
      expanded={on === true}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={
          <ArrowForwardIosIcon style={{ width: '20px', height: '20px' }} />
        }
      >
        <Title>랭킹</Title>
        {result === true ? null : (
          <Button onClick={handleButtonClick}>투표하기</Button>
        )}
        {admin === true ? (
          <>
            <Button onClick={handleButtonResultClick}>{text}</Button>
            <Button onClick={handleButtonRegisterClick}>후보자 등록</Button>
            {/* <Button onClick={() => {}}>후보자 삭제</Button> */}
            <Button onClick={handleClickInit}>초기화</Button>
          </>
        ) : null}
        {account === '' ? null : (
          <Box>
            <RestartAltIcon
              style={{
                width: '30px',
                height: '40px',
                marginTop: '7px',
                marginRight: '7px',
              }}
              onClick={handleRefreshButtonClick}
            />
          </Box>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {result === true ? (
          <RankingResultItems list={rankingList} />
        ) : (
          <RankingItems check={check} setCheck={setCheck} list={list} />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default Ranking
