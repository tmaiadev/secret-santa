import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Header from '../header';
import './styles.css';
import { redirect } from '../../helpers/router';

const Menu = () => {
    return (
        <div className="menu">
            <Header />
            <div className="menu__content">
                MENU CONTENT
            </div>
            <Button fab onClick={() => redirect('new')}>
                +
            </Button>
        </div>
    )
}

export default Menu;