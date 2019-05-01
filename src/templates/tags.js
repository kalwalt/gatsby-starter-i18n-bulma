import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import PostList from '../components/PostList'
import { FormattedMessage } from 'react-intl'
import Helmet from 'react-helmet'
import Layout from "../components/LayoutTag"

const TagRoute = ({ data, pageContext }) => {

  const posts = data.allMarkdownRemark.edges.map(p => p.node)

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
  <Layout data={data} location={location}>
    <section className="section">
      <header className="title is-size-3 has-text-weight-bold is-bold-light">
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
        <div className="content">
        <span className="tag is-light is-medium">“{pageContext.tag}”</span>
        </div>
        {allTagsLink}
      </header>
      <PostList
        posts={posts}
      />
      <footer className="footer">
        <span className="tag is-light is-medium">
        {allTagsLink}
        </span>
      </footer>
    </section>
  </Layout>
  )
}

TagRoute.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
}

export default TagRoute

export const pageQuery = graphql`
query TagPage($langKey: String!) {
  site {
    siteMetadata {
      languages {
        langs
        defaultLangKey
      }
    }
  }
  markdownRemark {
    frontmatter {
      title
    }
  }
  allMarkdownRemark(limit: 1000, sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {templateKey: {eq: "blog-post"}}, fields: {langKey: {eq: $langKey}}}) {
    totalCount
    edges {
      node {
        frontmatter {
          title
          date
        }
        fields {
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
