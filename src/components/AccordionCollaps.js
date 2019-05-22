import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import { FormattedMessage } from 'react-intl';
import select from '../components/utils'
import { FaAngleDown } from 'react-icons/fa'

const AccordionCollaps = ( props ) => {
  //console.log(props);
  const switches = props.switches;
  const links = props.links;
  const sel = select(props.langKey);

  return(
    <div id="collapsible-accordion">
    <div className="message">
      <div className="message-header">
        <p><FormattedMessage id={props.baseName} /></p>
        <a href={"#collapsible-message-accordion-" + props.num } data-action="collapse"  aria-label="more options">
          <span className="icon">
            <FaAngleDown  aria-hidden="true"/>
          </span>
        </a>
      </div>
      <div id={"collapsible-message-accordion-" + props.num } className="message-body is-collapsible" data-parent="collapsible-accordion">
        <div className="message-body-content">
        {switches &&( switches.map(( message ) => (
          <div className="content">
          <Link className="navbar-item" key={message} to={links[message][sel]}>
            <FormattedMessage id={message} />
          </Link>
          </div>
         )))}
        </div>
      </div>
    </div>
  </div>
  );
};

AccordionCollaps.propTypes = {
  keys: PropTypes.array,
  links: PropTypes.object,
  switches: PropTypes.array,
  langKey: PropTypes.string,
  baseName: PropTypes.string,
  num: PropTypes.string
};

export default AccordionCollaps;
