import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import { FaHome, FaQuestion, FaImage, FaPenAlt, FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import SelectLanguage from './SelectLanguage';
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'
import Dropdown from '../components/DropDownMenu'
import select from '../components/utils'
import menu from '../data/artworksMenu'

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

   // Get all "navbar-link" elements
  const navbarLink = Array.prototype.slice.call(document.querySelectorAll('.navbar-link'), 0);
   // Check if there are any navbar links
  if (navbarLink.length > 0) {

    // Add a click event on each of them
    navbarLink.forEach( el => {
      el.addEventListener('click', () => {
        el.nextElementSibling.classList.toggle('is-hidden-mobile');
      });
    });
  }
 }

 render() {

   const props = this.props;
   const sel = select(props.langKey);
   const keys = ['painting','sculpture','performance','interactivity'];

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
          <Link className="navbar-item" to={"/" + props.langKey}>
            <FaHome className="menu-names" /> <FormattedMessage id="home" />
          </Link>
            <Dropdown
            langKey={props.langKey}
            base={"/" + props.langKey + "/" + menuTree.artworks[sel] +"/"}
            baseName="artworks"
            switches={keys}
            links={menu}
            />
          <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.about[sel] +"/"}>
            <FaQuestion className="menu-names" /> <FormattedMessage id="about" />
          </Link>
          <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.blog[sel] +"/"}>
            <FaPenAlt className="menu-names" /> <FormattedMessage id="blog" />
          </Link>
          <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.contact[sel] +"/"}>
            <FaAmericanSignLanguageInterpreting className="menu-names" /> <FormattedMessage id="contact" />
          </Link>
        </div>
        </div>
      </div>
    </nav>
</header>
)}
}

export default Header;
