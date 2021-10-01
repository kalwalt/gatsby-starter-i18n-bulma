import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Helmet from 'react-helmet';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import { checkPath, startPath, setLangsMenu } from '../components/LayoutUtils';
import './all.sass';

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
    this.langsMenu = getLangs(
      langs,
      this.langKey,
      getUrlForLang(this.homeLink, url)
    );
    const id_article = data.markdownRemark.frontmatter.id;
    const id = Number(id_article) - 1;
    const basename = checkPath(this.langKey, id, jsonData);
    var basePath = startPath(this.langKey, basename[0], url);
    //finally here we set the desired url...
    setLangsMenu(this.langsMenu, basename[1], basePath, jsonData, langs);

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
            <meta name="description" content={this.description} />
          </Helmet>
          <Header
            langKey={this.langKey}
            langs={this.langsMenu}
            menu={this.menuTree}
          />
          <Main key="app-main" className={this.className}>
            {this.children}
          </Main>
          <Footer langKey={this.langKey} />
        </div>
      </IntlProvider>
    );
  }
}

export default TemplateWrapper;
