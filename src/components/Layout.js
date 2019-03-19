import React, { Component } from 'react'
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
import menuTree from '../data/menuTree'


const getIdUrl = (id, langKey) => {
  if(id){
  var res;
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
}
};

const startPath = (langKey, langsMenu, basename, _url) => {
  const lengthLangKey = langKey.length;
  var indx;
  indx = _url.indexOf(basename);
  const basePath = _url.slice(lengthLangKey + 2, indx);
  return basePath;
};

const blog_basename = (langKey, _url) => {
  const lengthLangKey = langKey.length;
  var indx;
  var basePath;
  if (_url.length == 9 && _url.includes("blog")){
  indx = _url.indexOf('blog');
  if (indx == 4){
     basePath = _url.slice(lengthLangKey + 2, 9);
     }
  }
  return basePath
}

const check_path = (langKey, _url, id_article) => {
  var basename
  if (_url.length == 9 && _url.includes("blog")){
    basename = blog_basename(langKey, _url);
    id_article = '02';
  } else {
    basename = getIdUrl(id_article, langKey);
  }
  return [basename, id_article];
}

const setLangsMenu = ( langsMenu, id, basePath) => {
  if(id){
  langsMenu[0].link = `/en/${basePath}` + getIdUrl(id, 'en');
  langsMenu[1].link = `/it/${basePath}` + getIdUrl(id, 'it');
}
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
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    this.langsMenu = getLangs(langs, this.langKey, getUrlForLang(this.homeLink, url));
    const id_article = data.markdownRemark.frontmatter.id;
    console.log("id_article is:");
    console.log(id_article);
    //const id_js = data.allJavascriptFrontmatter.edges[0].node.frontmatter.id ;
    console.log("id from blog:");
    //console.log(id_js);
    const basename = check_path(this.langKey, url, id_article);
    //const basename = getIdUrl(id_article, this.langKey);
    console.log("basename is:");
    console.log(basename);
    console.log("blog basename is:");
    console.log(blog_basename(this.langKey, url));
    var basePath = startPath(this.langKey, this.langsMenu, basename[0], url);
    //finally here we set the desired url...
    setLangsMenu( this.langsMenu, basename[1], basePath);

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
          <Header langKey={this.langKey} langs={this.langsMenu} menu={this.menuTree} />
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
