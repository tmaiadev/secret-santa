import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Context, { ACTION_TYPES } from '../../helpers/dialogContext';

export default () => {
  const { dialog, dispatchDialog } = useContext(Context);
  const { closeCallback, cancelButtonCallback, confirmButtonCallback } = dialog;

  const dispatchClose = () => {
    if (closeCallback) closeCallback();
    dispatchDialog({ type: ACTION_TYPES.CLOSE });
  }

  const closeDialog = () => {
    if (cancelButtonCallback) cancelButtonCallback();
    dispatchClose();
  }

  const confirmDialog = () => {
    if (confirmButtonCallback) confirmButtonCallback();
    dispatchClose();
  }

  return <Dialog
    aria-describedby="alert-dialog-description"
    aria-labelledby="alert-dialog-title"
    onClose={closeDialog}
    open={dialog.open}
  >
    <DialogTitle id="alert-dialog-title">
      {dialog.title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {dialog.body}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {
        dialog.cancelButtonShow
          && (
            <Button onClick={closeDialog}>
              {dialog.cancelButtonText}
            </Button>
          )
      }
      {
        dialog.confirmButtonShow
          && (
            <Button
              autoFocus
              color="primary"
              onClick={confirmDialog}
            >
              {dialog.confirmButtonText}
            </Button>
          )
      }
    </DialogActions>
  </Dialog>
};