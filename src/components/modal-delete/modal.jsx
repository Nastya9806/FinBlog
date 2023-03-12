import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ModalWindow = ({ modal, handleCloseModal, handleClickDelete }) => (
  <Dialog
    open={modal}
    onClose={handleCloseModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete article</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">Are you sure to delete this article?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal} autoFocus>
        Отмена
      </Button>
      <Button onClick={handleClickDelete}>Удалить</Button>
    </DialogActions>
  </Dialog>
);

export default ModalWindow;