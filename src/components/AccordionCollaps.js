import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import { FormattedMessage } from 'react-intl';
import select from '../components/utils'
import { FaAngleDown } from 'react-icons/fa'

const AccordionCollaps = ( props ) => {
  const switches = props.switches;
  const links = props.links;
  const sel = select(props.langKey);

  return(
    <section className="accordions">
    <article className="accordion is-active">
      <div className="accordion-header toggle">
        <p><FormattedMessage id={props.baseName} /></p>
          <button class="toggle" aria-label="toggle"></button>
      </div>
      <div className="accordion-body">
        <div className="accordion-content">
        {switches &&( switches.map(( message ) => (
          <div className="content">
          <Link className="navbar-item" key={message} to={links[message][sel]}>
            <FormattedMessage id={message} />
          </Link>
          </div>
         )))}
        </div>
      </div>
    </article>
  </section>
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
