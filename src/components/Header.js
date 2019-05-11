import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import { FaHome, FaQuestion, FaImage, FaPenAlt, FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import SelectLanguage from './SelectLanguage';
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'
import Dropdown from '../components/DropDownMenu'
import RootMenu from '../components/RootMenu'
import RootMenuMobile from '../components/RootMenuMobile'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import select from '../components/utils'
import menu from '../data/artworksMenu'

const Header = class extends React.Component {

  componentDidMount() {

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

  if (isMobile) {

    // Get all "accordions" elements
   const accordion = Array.prototype.slice.call(document.querySelectorAll('.accordions'), 0);
    // Check if there are any navbar links
   if (accordion.length > 0) {

     // Add a click event on each of them
     accordion.forEach( el => {
       el.addEventListener('click', () => {
         //console.log(el.firstChild);
         el.firstChild.classList.toggle('is-active');
       });
     });
   }

    /*
    if (typeof window !== 'undefined') {
      const bulmaCollapsible = this.bulmaCollapsible;
      // Return an array of bulmaCollapsible instances (empty if no DOM node found)
    const bulmaCollapsibleInstances = bulmaCollapsible.attach('.is-collapsible');

    // Loop into instances
    bulmaCollapsibleInstances.forEach(bulmaCollapsibleInstance => {
        // Check if current state is collapsed or not
        console.log(bulmaCollapsibleInstance.collapsed());
    });

    const bulmaCollapsibleElement_1 = new bulmaCollapsible('#collapsible-message-accordion-1');

    // Access to the bulmaCollapsible instance from DOM
    const collapsibleElement_1 = document.getElementById('#collapsible-message-accordion-1');
    if (collapsibleElement_1) {
      const collapsibleInstance_1 = collapsibleElement_1.bulmaCollapsible();
      bulmaCollapsibleElement_1.bulmaCollapsible('open');

    }

    const bulmaCollapsibleElement_2 = new bulmaCollapsible('#collapsible-message-accordion-2');

    // Access to the bulmaCollapsible instance from DOM
    const collapsibleElement_2 = document.getElementById('#collapsible-message-accordion-2');
    if (collapsibleElement_2) {
      const collapsibleInstance_2 = collapsibleElement_2.bulmaCollapsible();
      bulmaCollapsibleElement_2.bulmaCollapsible('open');
    }

    const bulmaCollapsibleElement_3 = new bulmaCollapsible('#collapsible-message-accordion-3');

    // Access to the bulmaCollapsible instance from DOM
    const collapsibleElement_3 = document.getElementById('#collapsible-message-accordion-3');
    if (collapsibleElement_1) {
      const collapsibleInstance_3 = collapsibleElement_1.bulmaCollapsible();
      bulmaCollapsibleElement_3.bulmaCollapsible('open');

    }

    const bulmaCollapsibleElement_4 = new bulmaCollapsible('#collapsible-message-accordion-4');

    // Access to the bulmaCollapsible instance from DOM
    const collapsibleElement_4 = document.getElementById('#collapsible-message-accordion-4');
    if (collapsibleElement_1) {
      const collapsibleInstance_4 = collapsibleElement_4.bulmaCollapsible();
      bulmaCollapsibleElement_4.bulmaCollapsible('open');

    }
  }*/
  }
}

 render() {

   const props = this.props;
   const sel = select(props.langKey);
   const keys = ['introduction','portfolio','painting','sculpture','performance','interactivity'];

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
          <BrowserView>
            <RootMenu
              langKey={props.langKey}
              base={"/" + props.langKey + "/" + menuTree.artworks[sel] +"/"}
              baseName="test"
              switches={keys}
              links={menu}
              />
          </BrowserView>
          <MobileView>
            <RootMenuMobile
              langKey={props.langKey}
              base={"/" + props.langKey + "/" + menuTree.artworks[sel] +"/"}
              baseName="test"
              switches={keys}
              links={menu}
              />
          </MobileView>
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
