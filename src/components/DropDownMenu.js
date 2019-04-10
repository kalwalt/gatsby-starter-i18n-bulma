import React from 'react';
import { Link } from 'gatsby'
import { FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import select from '../components/utils'
import menu from '../data/artworksMenu'

const DropDownMenu = (props) => {

  const switches = props.switches;
  const links = props.links;
  const sel = select(props.langKey);

  return (
    <div className="navbar-item has-dropdown is-hoverable">
       <Link className="navbar-link" to={props.base}>
         <FaImage className="menu-names" />
         <FormattedMessage id={props.baseName} />
       </Link>
       <div className="navbar-dropdown is-hidden-mobile is-boxed">
       {switches &&( switches.map(( message ) => (
         <Link className="navbar-item" key={message} to={links[message][sel]}>
           <FormattedMessage id={message} />
         </Link>
        )))}
       </div>
     </div>
  );
};

DropDownMenu.propTypes = {
  keys: PropTypes.array,
  links: PropTypes.object
};

export default DropDownMenu;
