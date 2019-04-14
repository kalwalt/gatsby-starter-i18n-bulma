import React from 'react';
import PropTypes from 'prop-types';
import {  FaPaintBrush, FaGavel, FaBolt, FaHandPointer} from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

const IconMenu = class extends React.Component {

  componentDidMount() {
    // Get all "icon" elements
   const sectionMenu = Array.prototype.slice.call(document.querySelectorAll('.icon'), 0);
    // Check if there are any icon links
   if (sectionMenu.length > 0) {

     // Add a mouseenter event on each of them
     sectionMenu.forEach( el => {
       el.addEventListener('mouseenter', () => {
         el.classList.toggle('shake');
       });
     });
   }

  }
  render() {
    const firstLink = this.props.firstLink;
    const secondLink = this.props.secondLink;
    const thirdLink = this.props.thirdLink;
    const fourthLink = this.props.fourthLink;
  return(
    <div className="section box">
      <div className="section">
        <h3 className="title has-text-centered">
          <FormattedMessage id="menu-icon-message"/>
        </h3>
      </div>
    <div className="columns is-8 is-mobile is-multiline is-centered">
      <a className="column is-narrow has-text-centered" href={firstLink}>
        <FaPaintBrush className="icon is-large animated"/>
      <div className="section">
        <h4 className="title has-text-centered">
          <FormattedMessage id="menu-icon-painting"/>
        </h4>
      </div>
      </a>
      <a className="column is-narrow has-text-centered" href={secondLink}>
        <FaGavel className="icon is-large animated"/>
        <div className="section">
          <h4 className="title has-text-centered">
            <FormattedMessage id="menu-icon-sculpture"/>
          </h4>
        </div>
      </a>
      <a className="column is-narrow has-text-centered" href={thirdLink}>
        <FaBolt className="icon is-large animated"/>
        <div className="section">
          <h4 className="title has-text-centered">
            <FormattedMessage id="menu-icon-performance"/>
          </h4>
        </div>
      </a>
      <a className="column is-narrow has-text-centered" href={fourthLink}>
        <FaHandPointer className="icon is-large animated"/>
        <div className="section">
          <h4 className="title has-text-centered">
            <FormattedMessage id="menu-icon-interactivity"/>
          </h4>
        </div>
      </a>
     </div>
     </div>
  )
  }
};

IconMenu.propTypes = {
  firstLink: PropTypes.string,
  secondLink: PropTypes.string,
  thirdLink: PropTypes.string,
  fourthLink: PropTypes.string,
}

export default IconMenu;
