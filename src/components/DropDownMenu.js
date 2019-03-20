import React from 'react';
import { FaImage, FaAngleDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import dropdown from '@vizuaalog/bulmajs/src/plugins/dropdown';
import { FormattedMessage } from 'react-intl';

const DropDownMenu = (props) => {
  return (
<div className="dropdown is-hover is-hoverable">
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
      <FaImage />
      <FormattedMessage id="artworks" />
      <FaAngleDown/>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu$" role="menu">
    <div className="dropdown-content">
      <a href="#" className="dropdown-item">
        <FormattedMessage id="painting" />
      </a>
      <a className="dropdown-item">
        <FormattedMessage id="sculpture" />
      </a>
      <a href="#" className="dropdown-item">
        <FormattedMessage id="performance" />
      </a>
      <a href="#" className="dropdown-item">
        <FormattedMessage id="interactivity" />
      </a>
    </div>
  </div>
</div>
  );
};

DropDownMenu.propTypes = {
  links: PropTypes.string
};

export default DropDownMenu;
