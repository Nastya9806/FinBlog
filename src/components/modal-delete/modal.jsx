import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Alert from './exclamation-circle.png'
import classes from './modal.module.scss'

const ModalWindow = ({ modal, handleCloseModal, handleClickDelete }) => (

<Dialog
    open={modal}
    onClose={handleCloseModal}
    aria-describedby="alert-dialog-description"
    className={classes.modal}
  >
    <DialogContent sx={{display: 'flex', gap: '10px'}}>
      <img style={{width: '20px', height: '20px'}} src={Alert}/>
      <DialogContentText id="alert-dialog-description">Are you sure to delete this article?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal} autoFocus>
        No
      </Button>
      <Button className={classes.btn} onClick={handleClickDelete}>Yes</Button>
    </DialogActions>
  </Dialog>
  
)

export default ModalWindow;