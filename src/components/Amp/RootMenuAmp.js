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
      <section>
        <ul>
          <li>
        <Link  to={ "/" + props.langKey + "/" + menuTree.artworks[sel] + "/" }>
          <FaImage className="menu-names" />
          <FormattedMessage id="artworks"/>
        </Link>
        </li>
        <li>
        <Link  to={ menu.portfolio[sel] }>
          <FormattedMessage id="portfolio"/>
        </Link>
        </li>
        <li>
          <FormattedMessage id="painting"/>
        </li>
        <li>
          <Dropdown
            langKey={langKey}
            base={ menu_P.introduction[sel] }
            baseName="introduction"
            switches={keys_P}
            links={menu_P}
             />
        </li>
        <li>
          <FormattedMessage id="sculpture"/>
        </li>
        <li>
          <Dropdown
            langKey={langKey}
            base={ menu_S.introduction[sel] }
            baseName="introduction"
            switches={keys_S}
            links={menu_S}
             />
        </li>
        <li>
            <FormattedMessage id="performance"/>
        </li>
        <li>
           <Dropdown
           langKey={langKey}
           base={ menu_Perf.introduction[sel] }
           baseName="introduction"
           switches={keys_Perf}
           links={menu_Perf}
           />
        </li>
        <li>
          <FormattedMessage id="new-media"/>
        </li>
        <li>
         <Dropdown
         langKey={langKey}
         base={ menu_NM.augmented_reality[sel] }
         baseName="augmented_reality"
         switches={keys_NM}
         links={menu_NM}
         />
     </li>
   </ul>
</section>
  );
};

RootMenu.propTypes = {
  props: PropTypes.object,
};

export default RootMenu;
