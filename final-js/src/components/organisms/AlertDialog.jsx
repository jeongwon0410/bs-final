import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/system'
import * as colors from '@styles/colors'
import { erc20_contract, contract } from '@components/atoms/common'
import { useEffect } from 'react'
import { useState } from 'react'
import { Alert } from '@mui/material'
const CustomDialogTitle = styled(DialogTitle)`
  font-family: 'HBIOS-SYS';
  font-size: 30px;
`
const CustomDialogContentTextRed = styled(DialogContentText)`
  font-family: 'HBIOS-SYS';
  font-size: 20px;
  color: ${colors.redColor};
  margin-bottom: 5px;
`
const CustomDialogContentText = styled(DialogContentText)`
  font-family: 'HBIOS-SYS';
  font-size: 20px;
`

const CustomButton = styled(Button)`
  font-family: 'HBIOS-SYS';
  font-size: 20px;
  color: ${colors.greenColor};
`

function AlertDialog(props) {
  const {
    open,
    setOpen,
    check,
    account,
    setLoading,
    checkMainNFT,
    getCandidate,
  } = props
  const [nft, setNft] = useState(0)
  const [error, setError] = useState(false)
  useEffect(() => {
    const checkNFT = async () => {
      const amount = await erc20_contract.methods.balanceOf(account).call()
      if (amount > 0) {
        setNft(amount)
        setError(false)
      } else {
        setError(true)
      }
    }
    if (account !== '') {
      checkNFT()
    }
  }, [account])

  const handleClose = () => {
    setOpen(false)
  }

  const handleOkClick = async () => {
    setLoading(true)
    setOpen(false)
    try {
      await contract.methods
        .vote(check - 1, account, nft)
        .send({ from: account })
      checkMainNFT(account)
      getCandidate()
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleDeleteClick = async () => {
    await contract.methods.deleteCandidate(check - 1).send({ from: account })
  }

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <CustomDialogTitle>{'투표'}</CustomDialogTitle>
      <DialogContent>
        {check === 0 ? (
          <CustomDialogContentText>선택해 주세요</CustomDialogContentText>
        ) : (
          <>
            <CustomDialogContentTextRed>{check}번</CustomDialogContentTextRed>
            <CustomDialogContentText>
              선택 하시겠습니까?
            </CustomDialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={handleClose}>Cancel</CustomButton>
        <CustomButton onClick={handleOkClick} autoFocus>
          OK
        </CustomButton>
      </DialogActions>
      {error ? (
        <Alert severity="error">투표 실패 !! NFT 개수 확인</Alert>
      ) : null}
    </Dialog>
  )
}

export default AlertDialog
