import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import 'intl';
import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import it from 'react-intl/locale-data/it';
import 'intl/locale-data/jsonp/it';
import './all.sass'

import articleId from '../data/articleTree'
import menuTree from '../data/menuTree'

const getIdJsonUrl = (id, langKey, jsonData) => {
  if(id !== 'undefined'){
  let res;
  console.log(id);
  id = Number(id);
  console.log(id);
  //console.log(jsonData[id].it);
  switch (langKey) {
    //we get the name of the page according the id
    case 'en':
    res = jsonData[id].en;
    break;
    case 'it':
    res = jsonData[id].it;
    break;
    default: return ' ';
  }
  return res;
  } else {
  console.log("missed id in the getIdUrl() function!");
  }
};

const getIdUrl = (id, langKey) => {
  if(id !== 'undefined'){
  let res;
  switch (langKey) {
    //we get the name of the page according the id
    case 'en':
    res = articleId[id][0];
    break;
    case 'it':
    res = articleId[id][1];
    break;
    default: return ' ';
  }
  return res;
  } else {
  console.log("missed id in the getIdUrl() function!");
  }
};

const startPath = (langKey, langsMenu, basename, _url) => {
  const lengthLangKey = langKey.length;
  let indx;
  indx = _url.indexOf(basename);
  const basePath = _url.slice(lengthLangKey + 2, indx);
  return basePath;
};

const check_path = (langKey, _url, id_article, jsonData) => {
  let basename
  if (id_article !== 'undefined'){
    //basename = getIdUrl(id_article, langKey);
    basename = getIdJsonUrl(id_article, langKey, jsonData);
  }
  return [basename, id_article];
}

const setLangsMenu = ( langsMenu, id, basePath, jsonData) => {
  if(id !== 'undefined'){
  //langsMenu[0].link = `/en/${basePath}` + getIdUrl(id, 'en') + '/';
  langsMenu[0].link = `/en/${basePath}` + getIdJsonUrl(id, 'en', jsonData) + '/';
  //langsMenu[1].link = `/it/${basePath}` + getIdUrl(id, 'it') + '/';
  langsMenu[1].link = `/it/${basePath}` + getIdJsonUrl(id, 'it', jsonData) + '/';
  }else{
  console.log("missed id in the setLangsMenu() function!");
  }
};

// add concatenated locale data
addLocaleData([...en, ...it]);

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.children = this.props.children;
    const data = this.props.data;
    const jsonData = this.props.jsonData;
    console.log(jsonData);
    this.className = this.props.className;
    const location = this.props.location;
    this.title = data.markdownRemark.frontmatter.title;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    this.langsMenu = getLangs(langs, this.langKey, getUrlForLang(this.homeLink, url));
    const id_article = data.markdownRemark.frontmatter.id;
    const basename = check_path(this.langKey, url, id_article, jsonData);
    var basePath = startPath(this.langKey, this.langsMenu, basename[0], url);
    //finally here we set the desired url...
    setLangsMenu( this.langsMenu, basename[1], basePath, jsonData);

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
            key="app-head"
            defaultTitle={this.title}
            titleTemplate={`%s | ${this.title}`}
          >
          <html lang={this.langKey} />

          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          {/* Favicon stuff from realfavicongenerator.net */}
          <meta name="apple-mobile-web-app-title" content="example.com" />
          <meta name="application-name" content="example.com" />
          <meta name="theme-color" content="#D64000" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#D64000" />
          </Helmet>
          <Header langKey={this.langKey} langs={this.langsMenu} menu={this.menuTree} />
          <Main key="app-main" className={this.className}>
            {this.children}
          </Main>
          <Footer langKey={this.langKey}/>
        </div>
      </IntlProvider>
    );
  }
}

export default TemplateWrapper
