import React, { useState } from 'react';
import Page from '../page';
import Container from '../container';
import Input from '../input';
import './styles.css';

const EventForm = ({ edit }) => {
  const [formData, setFormData] = useState({
    title: {
      error: '',
      value: '',
    },
    description: {
      error: '',
      value: '',
    },
    date: {
      error: '',
      value: '',
    },
  });

  const onChange = ({
    target: { name, value }
  }) => {
    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        value
      }
    });
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    alert(1);
  };
  
  return (
    <Page title="New Event">
      <form
        onSubmit={onSubmit}
        className="event-form"
      >
        <Container>
          <div className="event-form__content">
            <Input
              name="name"
              id="name"
              label="Name"
              onChange={onChange}
            />
            <Input
              name="description"
              id="description"
              label="Description"
              type="textarea"
              onChange={onChange}
            />
            <Input
              name="datetime"
              id="datetime"
              label="Date and Time"
              type="datetime"
              onChange={onChange}
            />
          </div>
        </Container>
      </form>
    </Page>
  );
};

export default EventForm;
