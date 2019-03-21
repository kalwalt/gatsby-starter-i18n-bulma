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
import navbar from '@vizuaalog/bulmajs/src/plugins/navbar';

const Header = class extends React.Component {

 render() {

   const props = this.props;
   const sel = select(props.langKey);
   const keys = ['painting','sculpture','performance','interactivity'];
   const injectMenu = (sel) => {
     keys &&( keys.map((message) => (
      menu[message][sel]
     ))
   )};
   //const message = 'painting';
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
            <FaHome /> <FormattedMessage id="home" />
          </Link>
          <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.about[sel] +"/"}>
            <FaQuestion /> <FormattedMessage id="about" />
          </Link>
            <Dropdown
            langKey={props.langKey}
            base={"/" + props.langKey + "/" + menuTree.artworks[sel] +"/"}
            baseName="artworks"
            keys={keys}
            links={menu}
            />
          <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.blog[sel] +"/"}>
            <FaPenAlt /> <FormattedMessage id="blog" />
          </Link>
          <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.contact[sel] +"/"}>
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
