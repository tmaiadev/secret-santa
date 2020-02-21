import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

import Header from '../header';
import DialogContext, { ACTION_TYPES as DIALOG_ACTION_TYPES } from '../../helpers/dialogContext';

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

const formValidationError = (field, message) => ({
  field,
  message
});

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
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const { dispatchDialog } = useContext(DialogContext);
  const history = useHistory();

  const onChange = ({ target: { id, value } }) => {
    setFormData({
      ...formData,
      [id]: {
        value,
        error: null
      }
    });
  };

  const onReturn = () => {
    dispatchDialog({
      type: DIALOG_ACTION_TYPES.OPEN,
      payload: {
        title: 'Cancel Event',
        body: 'Are you sure you want to cancel?',
        confirmButtonCallback: () => history.push('/')
      }
    });
  }

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

      dispatchDialog({
        type: DIALOG_ACTION_TYPES.OPEN,
        payload: {
          title: 'New Event',
          body: 'Are you sure you want to proceed? You can edit the event later.',
          confirmButtonCallback: () => alert(1)
        }
      });
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
          autoFocus
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
    </div>
  );
};

export default EventForm;