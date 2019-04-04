import React from 'react'
import { FormattedMessage } from 'react-intl';
import { FaCopyright } from 'react-icons/fa';

const Copyright = () => (
   <section className="section">
     <br/>
     <div className="container content">
      <div className="container is-fluid has-text-light">
        <FaCopyright className="menu-names" /> <FormattedMessage id="copyright"/>
      </div>
     </div>
   </section>
)

export default Copyright
