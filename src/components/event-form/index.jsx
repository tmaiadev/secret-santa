import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

import Header from '../header';
import DialogContext from '../../helpers/dialogContext';
import UserContext from '../../helpers/userContext';
import { db } from '../../helpers/firebase';
import {
  StyledForm,
  StyledTextField,
  StyledCtaWrapper
} from './styles';

const dateToStr = date => 
  date
    .toISOString()
    .replace(/\.\d+Z?$/, '');

const formatString = str => {
  const firstLetter = str
    .trim()
    .substr(0, 1)
    .toUpperCase();

  return `${firstLetter}${str.substr(1)}`;
};

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
  const [showSubmitSpinner, setShowSubmitSpinner] = useState(false);
  const { alert, confirm } = useContext(DialogContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  
  const addEventToDatabase = async () => {
    const { uid, displayName, photoURL } = user;
    const host = { uid, displayName, photoURL };

    const newEvent = {
      name: formData.name.value,
      description: formData.description.value,
      datetime: formData.datetime.value,
      host,
      participants: [host]
    };

    try {
      const { id } = await db.collection('events').add(newEvent);

      history.push(`/${ id }`);
    } catch (_) {
      alert(
        'Somethign went wrong!',
        'Verify your Internet connection and try again',
        () => setShowSubmitSpinner(false)
      );
    }
  };

  const onChange = ({ target: { id, value } }) => {
    setFormData({
      ...formData,
      [id]: {
        value: formatString(value),
        error: null
      }
    });
  };

  const onReturn = () => {
    confirm(
      'Cancel Event',
      'Are you sure you want to cancel?',
      () => history.push('/')
    );
  };

  const onSubmit = evt => {
    evt.preventDefault();
    setShowSubmitSpinner(true);

    const { name, datetime } = formData;

    try {
      if (!name.value)
        throw formValidationError('name', 'Name cannot be blank');

      if (name.value.length < 3)
        throw formValidationError('name', 'Name is too short');

      if (isNaN(Date.parse(datetime.value)))
        throw formValidationError('datetime', 'Invalid date');

      confirm(
        'New Event',
        'Are you sure you want to proceed? You can edit the event later',
        addEventToDatabase
      );
    } catch (e) {
      const { field, message } = e;

      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          error: message
        }
      });

      setShowSubmitSpinner(false);
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
            disabled={showSubmitSpinner}
          >
            {showSubmitSpinner
              && (
                <>
                  <CircularProgress
                    color="inherit"
                    size={20}
                  />
                  &nbsp;
                </>
              )}
            Save
          </Button>
        </StyledCtaWrapper>
      </StyledForm>
    </div>
  );
};

export default EventForm;