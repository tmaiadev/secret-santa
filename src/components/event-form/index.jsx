import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

import Header from '../header';

const StyledForm = styled.form`
  padding: 32px 16px;
  margin: 0 auto;
  max-width: 768px;

  & > * {
    margin-bottom: 32px !important;

    &:last-child {
      margin-bottom: 0 !important;
    }
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledCtaWrapper = styled.div`
  text-align: right;
`;

const dateToStr = date => 
  date
    .toISOString()
    .replace(/\.\d+Z?$/, '');

const tomorrowAtEight = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(20);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  
  return date;
};

const formValidationError = (field, message) => {
  return {
    field,
    message
  };
};

const DEFAULT_FORM_DATA = {
  name: {
    value: '',
    error: null
  },
  description: {
    value: '',
    error: null
  },
  datetime: {
    value: dateToStr(tomorrowAtEight()),
    error: null
  }
};

const NAME_HELPER_TEXT = "e.g. Office Christmas Party, Family gathering";
const DESCRIPTION_HELPER_TEXT = "e.g. Address, price range, rules";

const EventForm = () => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const history = useHistory();
  
  const closeConfirmationDialog = () => setShowConfirmationDialog(false);

  const onChange = ({ target: { id, value } }) => {
    setFormData({
      ...formData,
      [id]: {
        value,
        error: null
      }
    });
  };

  const onReturn = () => history.push('/');
  
  const onSubmit = evt => {
    evt.preventDefault();

    const { name, datetime } = formData;

    try {
      if (!name.value)
        throw formValidationError('name', 'Name cannot be blank');

      if (name.value.length < 3)
        throw formValidationError('name', 'Name is too short');

      if (isNaN(Date.parse(datetime.value)))
        throw formValidationError('datetime', 'Invalid date');

      setShowConfirmationDialog(true);
    } catch (e) {
      const { field, message } = e;

      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          error: message
        }
      });
    }
  };
  
  return (
    <div>
      <Header
        title={ formData.name.value || "New Event" }
        onReturn={onReturn}
      />
      <StyledForm autoComplete="off" onSubmit={onSubmit}>
        <StyledTextField
          defaultValue={formData.name.value}
          error={formData.name.error}
          helperText={formData.name.error || NAME_HELPER_TEXT}
          id="name"
          label="Name"
          onChange={onChange}
          required
          variant="outlined"
        />
        <StyledTextField
          defaultValue={formData.description.value}
          error={!!formData.description.error}
          helperText={formData.description.error || DESCRIPTION_HELPER_TEXT}
          id="description"
          label="Description"
          multiline
          onChange={onChange}
          rows="4"
          variant="outlined"
        />
        <StyledTextField
          defaultValue={formData.datetime.value}
          error={!!formData.datetime.error}
          helperText={formData.datetime.error}
          id="datetime"
          InputLabelProps={{ shrink: true }}
          label="Date & Time"
          onChange={onChange}
          required
          type="datetime-local"
          variant="outlined"
        />
        <StyledCtaWrapper>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
        </StyledCtaWrapper>
      </StyledForm>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={closeConfirmationDialog}
        open={showConfirmationDialog}
      >
        <DialogTitle id="alert-dialog-title">
          Create new event
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to continue? Don't worry, you
            can edit the event later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog}>
            Cancel
          </Button>
          <Button onClick={closeConfirmationDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventForm;