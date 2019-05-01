import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import PostList from '../components/PostList'
import { FormattedMessage } from 'react-intl'
import { IntlProvider, addLocaleData } from 'react-intl';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import Helmet from 'react-helmet'
import Layout from "../components/Layout"

const TagRoute = ({ data, pageContext }) => {

  const posts = data.allMarkdownRemark.edges.map(p => p.node)
  console.log(posts);
  console.log(data.allMarkdownRemark.edges);
  const url = location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const i18nMessages = require(`../data/messages/${langKey}`);

  const allTagsLink = (
    <FormattedMessage id="tags.allTagsLink" >
      {(txt) => (
        <Link
          to={`/${pageContext.langKey}/tags/`}
        >
          {txt}
        </Link>
      )}
    </FormattedMessage>
  )

  return (
    <IntlProvider
      locale={langKey}
      messages={i18nMessages}

    >
    <section>
      <header>
        <FormattedMessage id="tags">
          {(txt) => (
            <Helmet
              title={`${pageContext.tag} | ${txt}`}
              meta={[{ name: 'description', content: txt }]}
            />
          )}
        </FormattedMessage>
        <FormattedMessage
          id="tags.nPostsTaggedWith"
          values={{ nPosts: data.allMarkdownRemark.totalCount }}
        />
        <span>“{pageContext.tag}”</span>
        {allTagsLink}
      </header>
      <PostList
        posts={posts}
      />
      <footer>
        {allTagsLink}
      </footer>
    </section>
  </IntlProvider>
  )
}

TagRoute.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
}

export default TagRoute

export const pageQuery = graphql`
  query TagPage($langKey: String!) {
      site{
        siteMetadata{
          languages{
            langs
            defaultLangKey
          }
        }
      }
  allMarkdownRemark(limit: 1000,
    sort: {fields: [frontmatter___date], order: DESC},
    filter: {
      frontmatter: { templateKey: { eq: "blog-post" }}
      fields: {
        langKey: {eq: $langKey}
      }
    }) {
    totalCount
    edges {
      node {
        frontmatter{
          title
          date
        }
        fields{
          langKey
          slug
          tagSlugs {
             tag
             link
           }
        }
        excerpt
      }
    }
  }
  }
`
