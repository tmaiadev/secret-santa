import React from 'react';
import Container from '../container';
import Header from '../header';
import Link from '../link';
import './styles.css';

const Page = ({ title, children }) => {
  return (
    <div className="page">
      <Header
        logo={false}
        title={title}
        headingLevel={2}
      />
      <nav className="page__nav" aria-label={title}>
        <Container noPadding>
          <ul className="page__nav-list">
            <li className="page__nav-list-item">
              <Link
                href="/"
                aria-label="Return to Menu"
                className="page__nav-link page__return-btn"
              >
                <div
                  className="page__nav-link-content"
                  aria-hidden
                >
                  <i className="page__nav-link-icon ion-md-arrow-back" />
                  Return
                </div>
              </Link>
            </li>
          </ul>
        </Container>
      </nav>
      <div className="page__content">
        {children}
      </div>
    </div>
  )
};

export default Page;