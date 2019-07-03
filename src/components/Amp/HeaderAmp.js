import React from 'react'
import { Link } from 'gatsby'
import logo from '../../img/logo.svg'
import { FaHome, FaQuestion, FaImage, FaPenAlt, FaAmericanSignLanguageInterpreting } from 'react-icons/fa'
import SelectLanguage from '../../components/SelectLanguage'
import { FormattedMessage } from 'react-intl';
import menuTree from '../../data/menuTree'
import RootMenu from '../../components/Amp/RootMenuAmp'
import select from '../../components/utils'
import menu from '../../data/artworksMenu'

const Header = class extends React.Component {

 render() {

   const props = this.props;
   const sel = select(props.langKey);
   const keys = ['introduction','portfolio','painting','sculpture','performance','interactivity'];

   return (
     <header class="site-header">
     <Link to="/" className="logo" title="Logo">
       <span class="logo"><amp-img src={logo} width="600" height="60" alt="kaki logo" noloading></amp-img></span>
       </Link>
       <amp-accordion class="accordion-menu" disable-session-states>
       <section>
        <h4 class="text-accordion-menu">  </h4>
        <div>
        <Link className="navbar-item" to={"/" + props.langKey}>
          <FaHome className="menu-names" /> <FormattedMessage id="home" />
        </Link>
          <RootMenu
            langKey={props.langKey}
            base={"/" + props.langKey + "/" + menuTree.artworks[sel] +"/"}
            baseName="test"
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
       </section>
     </amp-accordion>
     </header>
)}
}

export default Header;
