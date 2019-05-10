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
          {/* accordion begin */}
            <div id="collapsible-accordion">
          	<article className="message">
          		<div className="message-header">
          			<p><FormattedMessage id="painting"/></p>
                <a href="#collapsible-message-accordion-1" data-action="collapse"  aria-label="more options">
                  <span className="icon">
                    <FaAngleDown  aria-hidden="true"/>
                  </span>
                </a>
          		</div>
          		<div id="collapsible-message-accordion-1" className="message-body is-collapsible" data-parent="collapsible-accordion">
          			<div className="message-body-content">
          				<div className="content"><a href="#">First Link</a></div>
                  	<div className="content"><a href="#">Second Link</a></div>
                  	<div className="content"><a href="#">Third Link</a></div>
          			</div>
          		</div>
            </article>
          </div>
        {/* end_accordion */}
      </div>
    </div>
</div>
  );
};

export default RootMenu;
