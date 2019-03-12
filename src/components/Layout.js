import React, { Component } from 'react'
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import { rhythm } from "../utils/typography"
import 'intl';

import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import it from 'react-intl/locale-data/it';
import 'intl/locale-data/jsonp/it';
import './all.sass'
import 'font-awesome/css/font-awesome.css'

// add concatenated locale data
addLocaleData([...en, ...it]);

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.children = this.props.children;
    const data = this.props.data;
    const location = this.props.location;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    console.log("language is: ");
    console.log(this.langKey);
    this.langsMenu = getLangs(langs, this.langKey, getUrlForLang(this.homeLink, url));

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    this.i18nMessages = require(`../data/messages/${this.langKey}`);
  }
  render() {
    return (
      <IntlProvider
        locale={this.langKey}
        messages={this.i18nMessages}
      >
        <div>
          <Helmet
            title="Gatsby Default Starter"
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          />
          <Header langKey={this.langKey} langs={this.langsMenu} />
          <div>
            {this.children}
          </div>
          <Footer langKey={this.langKey}/>
        </div>
      </IntlProvider>
    );
  }
}

export default TemplateWrapper
