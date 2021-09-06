import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children, className }) => (
  <main role="main" id="content" className={className}>
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Main.defaultProps = {
  className: '',
};

export default Main;
