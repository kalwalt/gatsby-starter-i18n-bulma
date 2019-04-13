import React from 'react';
import PropTypes from 'prop-types';
import {  FaPaintBrush, FaGavel, FaBolt, FaHandPointer} from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

const IconMenu = () => {

  return(
    <div className="section box">
      <div className="section">
        <h3 className="title has-text-centered">
          <FormattedMessage id="menu-icon-message"/>
        </h3>
      </div>
    <div className="columns is-8 is-mobile is-multiline is-centered">
      <a className="column is-narrow has-text-centered">
        <FaPaintBrush className="icon is-large"/>
      <div className="section">
        <h4 className="title has-text-centered">
          <FormattedMessage id="menu-icon-painting"/>
        </h4>
      </div>
      </a>
      <a className="column is-narrow has-text-centered">
        <FaGavel className="icon is-large"/>
        <div className="section">
          <h4 className="title has-text-centered">
            <FormattedMessage id="menu-icon-sculpture"/>
          </h4>
        </div>
      </a>
      <a className="column is-narrow has-text-centered">
        <FaBolt className="icon is-large"/>
        <div className="section">
          <h4 className="title has-text-centered">
            <FormattedMessage id="menu-icon-performance"/>
          </h4>
        </div>
      </a>
      <a className="column is-narrow has-text-centered">
        <FaHandPointer className="icon is-large"/>
        <div className="section">
          <h4 className="title has-text-centered">
            <FormattedMessage id="menu-icon-interactivity"/>
          </h4>
        </div>
      </a>
     </div>
     </div>
  )
};

export default IconMenu;
