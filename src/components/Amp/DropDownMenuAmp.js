import React from 'react';
import { Link } from 'gatsby'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import select from '../../components/utils'

const DropDownMenu = (props) => {

  const switches = props.switches;
  const links = props.links;
  const sel = select(props.langKey);

  return (
    <amp-accordion>
      <section>
        <h4 className="navbar-link"><FormattedMessage id={props.header}/></h4>
        <div>
       <Link className="navbar-item" to={props.base}>
         <FormattedMessage id={props.baseName} />
       </Link>
       {switches &&( switches.map(( message ) => (
         <Link className="navbar-item" key={message} to={links[message][sel]}>
           <FormattedMessage id={message} />
         </Link>
        )))}
        </div>
      </section>
     </amp-accordion>
  );
};

DropDownMenu.propTypes = {
  keys: PropTypes.array,
  links: PropTypes.object,
  switches: PropTypes.array,
  langKey: PropTypes.string,
  baseName: PropTypes.string,
};

export default DropDownMenu;
