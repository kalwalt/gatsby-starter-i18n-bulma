import React from 'react'
import Link from 'gatsby-link'
import logo from '../img/logo.svg'
import { FaHome, FaQuestion, FaImage, FaPenAlt, FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import SelectLanguage from './SelectLanguage';
import { FormattedMessage } from 'react-intl';

const Header = class extends React.Component {

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {

     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {

         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');

       });
     });
   }
 }

 render() {

   const props = this.props;

   return (

<header>
<div className="navbar-end has-text-centered">
  <SelectLanguage langs={props.langs} />
</div>
    <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
          </Link>
          {/* Hamburger menu */}
          <div className="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navMenu" className="navbar-menu">
        <div className="navbar-start has-text-centered">
          <Link className="navbar-item" to={props.langKey}>
            <FaHome /> <FormattedMessage id="home" />
          </Link>
          <Link className="navbar-item" to={props.langKey + "/about/"}>
            <FaQuestion /> <FormattedMessage id="about" />
          </Link>
          <Link className="navbar-item" to={props.langKey + "/artworks/"}>
            <FaImage /> <FormattedMessage id="artworks" />
          </Link>
          <Link className="navbar-item" to={props.langKey + "/blog/"}>
            <FaPenAlt /> <FormattedMessage id="blog" />
          </Link>
          <Link className="navbar-item" to={props.langKey + "/contact/"}>
            <FaAmericanSignLanguageInterpreting /> <FormattedMessage id="contact" />
          </Link>
        </div>
        </div>
      </div>
    </nav>
</header>
)}
}

export default Header;
