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
import { FaImage, FaAngleRight, FaAngleDown } from 'react-icons/fa'
//import bulmaCollapsible from '~/@creativebulma/bulma-collapsible/src/js'
//import bulmaCollapsible from '@creativebulma/bulma-collapsible'


const RootMenu = ( props ) => {

    const langKey = props.langKey;
    const keys_P = [ 'painting-new', 'painting-oldest' ];
    const keys_S = [ 'marble', 'wood', 'bronze', 'other-materials' ];
    const keys_Perf = [ 'performance01', 'performance02', 'performance03', 'performance04' ];
    const keys_NM = [ 'augmented_reality', 'interactivity', 'experimental' ]
    const sel = select(props.langKey);

    return(
      <div className="navbar-item has-dropdown is-hoverable">
        <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.artworks[sel] + "/" }>
          <FaImage className="menu-names" />
          <FormattedMessage id="artworks"/>
        </Link>
        <div className="navbar-dropdown">
          <Link className="navbar-item" to={ menu.portfolio[sel] }>
            <FormattedMessage id="portfolio"/>
          </Link>
          <div className="navbar-item ">
            <div className="dropdown-trigger">
              <div id="collapsible-accord" className="navbar-item content  is-collapsible is-active" >
                <FormattedMessage id="painting"/>
                <span className="icon is-small">
                  <FaAngleRight  aria-hidden="true"/>
                </span>
              </div>
           </div>
           <div class="card">
           	<header class="card-header">
           		<p class="card-header-title">
           			Card title
           		</p>
           		<a href="#collapsible-card" data-action="collapse" class="card-header-icon is-hidden-fullscreen" aria-label="more options">
           			<span class="icon">
           				<FaAngleDown  aria-hidden="true"/>
           			</span>
           		</a>
           	</header>
           	<div id="collapsible-card" class="is-collapsible is-active">
           		<div class="card-content">
           			<p class="title is-4">
           				“There are two hard things in computer science: cache invalidation, naming things, and off-by-one
           				errors.”
           			</p>
           			<p class="subtitle is-5">
           				Jeff Atwood
           			</p>
           		</div>
           		<footer class="card-footer">
           			<p class="card-footer-item">
           				<span>
           					View on <a href="https://twitter.com/codinghorror/status/506010907021828096">Twitter</a>
           				</span>
           			</p>
           			<p class="card-footer-item">
           				<span>
           					Share on <a href="#">Facebook</a>
           				</span>
           			</p>
           		</footer>
           	</div>
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
           base={ menu_S.introduction[sel] }
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

export default RootMenu;
