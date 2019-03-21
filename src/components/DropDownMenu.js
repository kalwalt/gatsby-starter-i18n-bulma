import React from 'react';
import { Link } from 'gatsby'
import { FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import select from '../components/utils'
import menu from '../data/artworksMenu'

const DropDownMenu = (props) => {

  const keys = props.keys;
  const sel = select(props.langKey);
  return (
    <div className="navbar-item has-dropdown is-hoverable">
       <Link className="navbar-link" to={props.base}>
         <FaImage />
         <FormattedMessage id={props.baseName} />
       </Link>
       <div className="navbar-dropdown is-hidden-mobile is-boxed">
        {keys &&( keys.map(( message ) => (
         <a className="navbar-item" href={"/" + props.langKey + "/" + menu[message][sel] + "/"}>
           <FormattedMessage id={message} />
         </a>
       )))}
       </div>
     </div>
  );
};

DropDownMenu.propTypes = {
  keys: PropTypes.array
};

export default DropDownMenu;
