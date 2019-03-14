import React, { Component } from 'react'
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang, getSlugAndLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import { rhythm } from "../utils/typography"
import 'intl';

import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import it from 'react-intl/locale-data/it';
import 'intl/locale-data/jsonp/it';
import './all.sass'
import 'font-awesome/css/font-awesome.css'

import articleId from '../data/articleTree'

const getIdUrl = (id, langKey) => {
  console.log("inside the getter");
  var res;
  switch (langKey) {
    //we need the inverse of the current page...
    case 'en':
    res = articleId[id][0];
    break;
    case 'it':
    res = articleId[id][1];
    break;
    default: return null;
  }
  console.log("res is:");
  console.log(res);
  return res;
};

const startPath = (langKey, langsMenu, basename, _url) => {
  const lengthLangKey = langKey.length;
  console.log("length of the langKey:");
  console.log(lengthLangKey);
  var indx;
  indx = _url.indexOf(basename);
  /*
  switch (langKey) {
    case 'en':
    indx = langsMenu[0].link.indexOf(basename);
    break;
    case 'it':
    indx = langsMenu[1].link.indexOf(basename);
    break;
    default:
    return null;
    console.log("indx inside startPath:");
    console.log(indx);
  }*/
  console.log("indx inside startPath:");
  console.log(indx);
  //indx = 9;
  console.log("url:");
  console.log(_url);
  const basePath = _url.slice(lengthLangKey + 2, indx);
  console.log("basePath is:");
  console.log(basePath);
  //var basePath = '/blog'
  return basePath;
};


const setLangsMenu3 = ( langsMenu, id, basePath) => {
  console.log("inside the setter");
  langsMenu[0].link = `/en/${basePath}` + getIdUrl(id, 'en');
  langsMenu[1].link = `/it/${basePath}` + getIdUrl(id, 'it');
};

// add concatenated locale data
addLocaleData([...en, ...it]);

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.children = this.props.children;
    const data = this.props.data;
    const location = this.props.location;
    const url = location.pathname;
    console.log("url is: ");
    console.log(url);
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    console.log("language is: ");
    console.log(this.langKey);
    this.langsMenu = getLangs(langs, this.langKey, getUrlForLang(this.homeLink, url));
    //console.log("urlForLang is: ");
    //console.log(getUrlForLang(this.homeLink, url, this.langKey));
    console.log("langsMenu is: ");
    console.log(this.langsMenu);
    const id_article = data.markdownRemark.frontmatter.id;
    console.log(id_article);
    const basename = getIdUrl(id_article, this.langKey);
    const indx = this.langsMenu[0].link.indexOf(basename);
    const lengthLangKey = this.langKey.length;
    console.log("length of the langKey:");
    console.log(lengthLangKey);
    console.log("start index:");
    console.log(indx);
    console.log("basename:");
    console.log(basename);
    const basePath = url.slice(lengthLangKey + 2, indx);
    console.log("basePath is:");
    console.log(basePath);
    var Path = startPath(this.langKey, this.langsMenu, basename, url);
    console.log("path is:");
    //Path = '/blog'
    console.log(Path);

    setLangsMenu3( this.langsMenu, id_article, Path);
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
