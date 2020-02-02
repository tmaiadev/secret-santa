import React from 'react';
import PropTypes from 'prop-types';
import { redirect } from '../../helpers/router';

const Link = ({
  children,
  className,
  href,
  'aria-label': ariaLabel,
}) => {
  const onClick = (evt) => {
    evt.preventDefault();
    redirect(href);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  'aria-label': PropTypes.string,
};

export default Link;