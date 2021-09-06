import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import AccordionCollaps from '../components/AccordionCollaps'
import { FormattedMessage } from 'react-intl';
import menu from '../data/artworksMenu'
import menu_P from '../data/paintingMenu'
import menu_S from '../data/sculptureMenu'
import menu_Perf from '../data/performanceMenu'
import menu_NM from '../data/newmediaMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaImage } from 'react-icons/fa'

const RootMenuMobile = ( props ) => {

    const langKey = props.langKey;
    //console.log(langKey);
    const keys_P = [ 'introduction', 'painting-new', 'painting-oldest' ];
    const keys_S = [ 'introduction', 'marble', 'wood', 'bronze', 'other-materials' ];
    const keys_Perf = [ 'performance01', 'performance02', 'performance03', 'performance04' ];
    const keys_NM = [ 'augmented_reality', 'interactivity', 'experimental' ];
    const sel = select(props.langKey);

    return(
    <div className='navbar-item has-dropdown is-hoverable'>
      <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.artworks[sel] + "/" }>
          <FaImage className="menu-names" />
          <FormattedMessage id="artworks"/>
      </Link>
        <div className="content">
          <Link className="navbar-item" to={ menu.portfolio[sel] }>
            <FormattedMessage id="portfolio"/>
          </Link>
          <div className="navbar-item ">
        {/* accordion begin */}
        <AccordionCollaps
        num='1'
        langKey={langKey}
        base={ menu_P.introduction[sel] }
        baseName="painting"
        switches={keys_P}
        links={menu_P}
        />
      <AccordionCollaps
        num='2'
        langKey={langKey}
        base={ menu_S.introduction[sel] }
        baseName="sculpture"
        switches={keys_S}
        links={menu_S}
        />
        <AccordionCollaps
        num='3'
        langKey={langKey}
        base={ menu_Perf.performance01[sel] }
        baseName="performance"
        switches={keys_Perf}
        links={menu_Perf}
        />
        <AccordionCollaps
        num='4'
        langKey={langKey}
        base={ menu_NM.augmented_reality[sel] }
        baseName="new-media"
        switches={keys_NM}
        links={menu_NM}
        />
        {/* end_accordion */}
      </div>
    </div>
</div>
  );
};

RootMenuMobile.propTypes = {
  props: PropTypes.object,
};

export default RootMenuMobile;
