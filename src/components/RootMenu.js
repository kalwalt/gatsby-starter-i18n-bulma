import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Dropdown from '../components/DropDownMenu'
import { FormattedMessage } from 'react-intl';
import menu from '../data/artworksMenu'
import menu_P from '../data/paintingMenu'
import menu_S from '../data/sculptureMenu'
import menu_Perf from '../data/performanceMenu'
import menu_NM from '../data/newmediaMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaImage, FaAngleRight } from 'react-icons/fa'


const RootMenu = ( props ) => {
    const langKey = props.langKey;
    const keys_P = [ 'painting-new', 'painting-oldest' ];
    const keys_S = [ 'marble', 'wood', 'bronze', 'other-materials' ];
    const keys_Perf = [ 'performance01', 'performance02', 'performance03', 'performance04' ];
    const keys_NM = [ 'interactivity', 'experimental' ]
    const sel = select(props.langKey);

    return(
      <div className='navbar-item has-dropdown is-hoverable'>
        <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.artworks[sel] + "/" }>
          <FaImage className="menu-names" />
          <FormattedMessage id="artworks"/>
        </Link>
        <div className="navbar-dropdown">
          <Link className="navbar-item" to={ menu.portfolio[sel] }>
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
               base={ menu_P.introduction[sel] }
               baseName="introduction"
               switches={keys_P}
               links={menu_P}
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
             base={ menu_S.introduction[sel] }
             baseName="introduction"
             switches={keys_S}
             links={menu_S}
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
           base={ menu_Perf.introduction[sel] }
           baseName="introduction"
           switches={keys_Perf}
           links={menu_Perf}
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
         base={ menu_NM.augmented_reality[sel] }
         baseName="augmented_reality"
         switches={keys_NM}
         links={menu_NM}
         />
     </div>
    </div>
  </div>
</div>
</div>
  );
};

RootMenu.propTypes = {
  props: PropTypes.object,
};

export default RootMenu;
