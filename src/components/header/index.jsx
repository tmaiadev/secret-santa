import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { StyledContainer } from '../../styles';

const StyledAppBar = styled(AppBar)`
  position: sticky !important;
  top: 0;
`;

const StyledTitle = styled(Typography)`
  &.MuiTypography-h1 {
    color: #FFF;
    font-family: Norican, cursive;
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 1px 1px #000;
    white-space: nowrap;
  }
`;

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    color: #FFF;

    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const Header = ({ title, onReturn }) => {
  return (
    <StyledAppBar position="static">
      <StyledContainer>
        <Toolbar>
          {onReturn && 
            (
              <StyledIconButton
                aria-label="Return to Menu"
                onClick={onReturn}
              >
                <ArrowBackIcon />
              </StyledIconButton>
            )}
          <StyledTitle variant="h1">
            {title}
          </StyledTitle>
        </Toolbar>
      </StyledContainer>
    </StyledAppBar>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onReturn: PropTypes.func,
};

export default Header;