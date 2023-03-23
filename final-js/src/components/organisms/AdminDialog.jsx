import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/system'
import * as colors from '@styles/colors'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { contract } from '@components/atoms/common'
const CustomDialogTitle = styled(DialogTitle)`
  font-family: 'HBIOS-SYS';
  font-size: 30px;
`
const CustomButtonWhite = styled(Button)`
  font-family: 'HBIOS-SYS';
  font-size: 20px;
  color: ${colors.textPrimary};
  margin-top: 20px;
`
const CustomDialogContentText = styled(DialogContentText)`
  font-family: 'HBIOS-SYS';
  font-size: 20px;
  margin-top: 15px;
`

const CustomButton = styled(Button)`
  font-family: 'HBIOS-SYS';
  font-size: 20px;
  color: ${colors.greenColor};
`

const ImgWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  img {
    width: 500px;
    height: 200px;
  }
`
function AdminDialog(props) {
  const { open, setOpen, account } = props
  const [address, setAddress] = useState()
  const [id, setId] = useState()
  const [pw, setPw] = useState()

  const handleClose = () => {
    setOpen(false)
  }

  const setAdmin = async () => {
    setOpen(false)
    await contract.methods.makeAdmin(address).send({ from: account })
    await contract.methods.make(id, pw).send({ from: account })
  }

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <CustomDialogTitle>관리자 등록</CustomDialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CustomDialogContentText>지갑 주소</CustomDialogContentText>
          </Grid>
          <Grid item xs={9}>
            <TextField
              autoFocus
              margin="dense"
              color="success"
              fullWidth
              value={address || ''}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* <Grid container spacing={2}>
          <Grid item xs={3}>
            <CustomDialogContentText>아이디</CustomDialogContentText>
          </Grid>
          <Grid item xs={9}>
            <TextField
              margin="dense"
              color="success"
              fullWidth
              value={id || ''}
              onChange={(e) => setId(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <CustomDialogContentText>패스워드</CustomDialogContentText>
          </Grid>
          <Grid item xs={9}>
            <TextField
              margin="dense"
              color="success"
              fullWidth
              value={pw || ''}
              onChange={(e) => setPw(e.target.value)}
            />
          </Grid>
        </Grid> */}
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={handleClose}>Cancel</CustomButton>
        <CustomButton onClick={setAdmin}>Register</CustomButton>
      </DialogActions>
    </Dialog>
  )
}

export default AdminDialog
