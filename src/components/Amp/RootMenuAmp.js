import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Dropdown from '../../components/Amp/DropDownMenuAmp'
import { FormattedMessage } from 'react-intl';
import menu from '../../data/artworksMenu'
import menu_P from '../../data/paintingMenu'
import menu_S from '../../data/sculptureMenu'
import menu_Perf from '../../data/performanceMenu'
import menu_NM from '../../data/newmediaMenu'
import menuTree from '../../data/menuTree'
import select from '../../components/utils'
import { FaImage, FaAngleRight } from 'react-icons/fa'


const RootMenu = ( props ) => {
    const langKey = props.langKey;
    const keys_P = [ 'painting-new', 'painting-oldest' ];
    const keys_S = [ 'marble', 'wood', 'bronze', 'other-materials' ];
    const keys_Perf = [ 'performance01', 'performance02', 'performance03', 'performance04' ];
    const keys_NM = [ 'interactivity', 'experimental' ]
    const sel = select(props.langKey);

    return(
      <amp-accordion>
        <section>
        <h4 className="navbar-item"><FaImage className="menu-names" /><FormattedMessage id="artworks"/></h4>
        <div>
        <Link className="navbar-item" to={ "/" + props.langKey + "/" + menuTree.artworks[sel] + "/" }>
          <FaImage className="menu-names" />
          <FormattedMessage id="artworks"/>
        </Link>
        <Link className="navbar-item" to={ menu.portfolio[sel] }>
          <FormattedMessage id="portfolio"/>
        </Link>
          <Dropdown
            header="painting"
            langKey={langKey}
            base={ menu_P.introduction[sel] }
            baseName="introduction"
            switches={keys_P}
            links={menu_P}
            />
          <Dropdown
            header="sculpture"
            langKey={langKey}
            base={ menu_S.introduction[sel] }
            baseName="introduction"
            switches={keys_S}
            links={menu_S}
            />
          <Dropdown
           header="performance"
           langKey={langKey}
           base={ menu_Perf.introduction[sel] }
           baseName="introduction"
           switches={keys_Perf}
           links={menu_Perf}
           />
          <Dropdown
           header="new-media"
           langKey={langKey}
           base={ menu_NM.augmented_reality[sel] }
           baseName="augmented_reality"
           switches={keys_NM}
           links={menu_NM}
           />
       </div>
       </section>
     </amp-accordion>
  );
};

RootMenu.propTypes = {
  props: PropTypes.object,
};

export default RootMenu;
