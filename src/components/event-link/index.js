import React, { useState } from 'react';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import Paper from '@material-ui/core/Paper';
import styled, { css } from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: inherit;
  display: block;
  margin: 16px 0;
  text-decoration: none;
  outline: none;

  :last-of-type {
    margin-bottom: 80px;
  }
`;

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    position: relative;
    overflow: hidden;
  }
`;

const StyledContainer = styled.div`
  padding: 16px;
`;

const StyledArrowIcon = styled(ArrowRightRoundedIcon)`
  &.MuiSvgIcon-root {
    pointer-events: none;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translate(0px, -50%);
    transition: transform .2s ease-out;

    ${({ hidden }) => hidden && css`
      transform: translate(50px, -50%);
    `}
  }
`;

const EventLink = ({ id, name, datetime, participants, sorted }) => {
  const [focused, setFocused] = useState(false);
  const date = new Date(Date.parse(datetime));
  const isActive = window.location.pathname.replace(/^\//, '') === id;

  return (
    <StyledLink
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      to={`/${id}`}
    >
      <StyledPaper elevation={focused ? 5 : 3}>
        <StyledContainer>
          <Typography color="textSecondary">
            {date.toLocaleString()}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            color={isActive ? 'secondary' : 'inherit'}
          >
            {name}
          </Typography>
          <Typography
            aria-hidden
            color="textSecondary"
            component="div"
          >
            {participants.length} participant(s)
            {' - '}
            {sorted ? 'Sorted' : 'Not yet sorted'}
          </Typography>
          <StyledArrowIcon
            aria-hidden
            fontSize="large"
            hidden={isActive}
          />
        </StyledContainer>
      </StyledPaper>
    </StyledLink>
  );
};

export default EventLink;
