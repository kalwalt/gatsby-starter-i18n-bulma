import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import './all.sass'

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for de
  require('@formatjs/intl-relativetimeformat/dist/locale-data/it');
}

const getIdJsonUrl = (id, langKey, jsonData) => {
  if(id !== 'undefined'){
  let res;
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
    basename = getIdJsonUrl(id_article, langKey, jsonData);
  }
  return [basename, id_article];
}

const setLangsMenu = ( langsMenu, id, basePath, jsonData) => {
  if(id !== 'undefined'){
  langsMenu[0].link = `/en/${basePath}` + getIdJsonUrl(id, 'en', jsonData) + '/';
  langsMenu[1].link = `/it/${basePath}` + getIdJsonUrl(id, 'it', jsonData) + '/';
  }else{
  console.log("missed id in the setLangsMenu() function!");
  }
};

// add concatenated locale data
//addLocaleData([...en, ...it]);

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.children = this.props.children;
    const data = this.props.data;
    this.description = data.markdownRemark.frontmatter.description;
    const jsonData = this.props.jsonData;
    this.className = this.props.className;
    const location = this.props.location;
    this.title = data.markdownRemark.frontmatter.title;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    this.langsMenu = getLangs(langs, this.langKey, getUrlForLang(this.homeLink, url));
    const id_article = data.markdownRemark.frontmatter.id;
    const id = Number(id_article) - 1;
    const basename = check_path(this.langKey, url, id, jsonData);
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
        textComponent={React.Fragment}
      >
        <div>
          <Helmet
            key="app-head"
            defaultTitle={this.title}
            titleTemplate={`%s | ${this.title}`}
          >
          <html lang={this.langKey} />
          <meta name="description"  content={this.description}/>
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
