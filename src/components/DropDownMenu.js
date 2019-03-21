import React from 'react';
import { Link } from 'gatsby'
import { FaImage, FaAngleDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FormattedMessage } from 'react-intl';

const DropDownMenu = (props) => {

  const sel = select(props.langKey);
  return (
    <div className="navbar-item has-dropdown is-hoverable">
       <Link className="navbar-link" to={props.base}>
         <FaImage />
         <FormattedMessage id={props.baseName} />
       </Link>
       <div className="navbar-dropdown is-hidden-mobile is-boxed">
         <a className="navbar-item" href="#">
           <FormattedMessage id="painting" />
         </a>
         <a className="navbar-item" href="#">
           <FormattedMessage id="sculpture" />
         </a>
         <a className="navbar-item" href="#">
          <FormattedMessage id="performance" />
         </a>
         <a className="navbar-item" href="#">
          <FormattedMessage id="interactivity" />
         </a>
       </div>
     </div>
  );
};

DropDownMenu.propTypes = {
  links: PropTypes.string
};

export default DropDownMenu;
