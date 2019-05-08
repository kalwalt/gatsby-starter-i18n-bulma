import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Dropdown from '../components/DropDownMenu'
import { FormattedMessage } from 'react-intl';
import menu from '../data/artworksMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaImage, FaAngleRight } from 'react-icons/fa'


const RootMenu = ( props ) => {
    const langKey = props.langKey;
    const keys = [ 'painting', 'sculpture', 'performance' ];
    const base = '/en/test/';
    const sel = select(props.langKey);

    return(
      <div className="navbar-item has-dropdown is-hoverable">
        <Link className="navbar-link" to={"/" + props.langKey + "/" + menuTree.artworks[sel] + "/"}>
          <FaImage className="menu-names" />
          <FormattedMessage id="artworks"/>
        </Link>
        <div className="navbar-dropdown">
          <Link className="navbar-item" to={"/" + menu.portfolio[sel] + "/"}>
            <FormattedMessage id="portfolio"/>
          </Link>
          <div className="nested navbar-item dropdown">
            <div className="dropdown-trigger">
              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <FormattedMessage id="painting"/>
                <span className="icon is-small">
                  <FaAngleRight  aria-hidden="true"/>
                </span>
              </button>
           </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
               <div className="dropdown-content">
               <Dropdown
               langKey={langKey}
               base={base}
               baseName="introduction"
               switches={keys}
               links={menu}
               />
           </div>
          </div>
        </div>
        <div className="nested navbar-item dropdown">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <FormattedMessage id="sculpture"/>
              <span className="icon is-small">
                <FaAngleRight  aria-hidden="true"/>
              </span>
            </button>
         </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
             <div className="dropdown-content">
             <Dropdown
             langKey={langKey}
             base={base}
             baseName="introduction"
             switches={keys}
             links={menu}
             />
         </div>
        </div>
      </div>
      <div className="nested navbar-item dropdown">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <FormattedMessage id="performance"/>
            <span className="icon is-small">
              <FaAngleRight  aria-hidden="true"/>
            </span>
          </button>
       </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
           <div className="dropdown-content">
           <Dropdown
           langKey={langKey}
           base={base}
           baseName="introduction"
           switches={keys}
           links={menu}
           />
       </div>
      </div>
    </div>
    <div className="nested navbar-item dropdown">
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <FormattedMessage id="new-media"/>
          <span className="icon is-small">
            <FaAngleRight  aria-hidden="true"/>
          </span>
        </button>
     </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
         <div className="dropdown-content">
         <Dropdown
         langKey={langKey}
         base={base}
         baseName="augmented-reality"
         switches={keys}
         links={menu}
         />
     </div>
    </div>
  </div>
</div>
</div>
  );
};

export default RootMenu;
