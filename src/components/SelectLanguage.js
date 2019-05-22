import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { FormattedMessage } from 'react-intl';
import En from './Flags/En';
import It from './Flags/It';

const getIcon = langKey => {
  switch (langKey) {
    case 'en': return <En />;
    case 'it': return <It />;
    default: return null;
  }
};

const SelectLanguage = (props) => {
  const links = props.langs.map(lang =>
      <li className="flags" key={lang.langKey} selected={lang.selected}>
        <Link to={lang.link} alt={lang.langKey} style={{
          color: '#D64000'
        }}>
        {getIcon(lang.langKey)}
          </Link>
      </li>
  );

  return (
    <div className="section" style={{ padding: '1.5rem' }}>
      <header style={{
        color: '#D64000'
      }}>
        <FormattedMessage id="selectLanguage" />
      </header>
      <ul>
        {links}
      </ul>
    </div>
  );
};

SelectLanguage.propTypes = {
  langs: PropTypes.array
};

export default SelectLanguage;
