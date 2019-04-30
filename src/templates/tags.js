import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import PostList from '../components/PostList'
import { FormattedMessage } from 'react-intl'
import Helmet from 'react-helmet'
import Layout from "../components/Layout"

const TagRoute = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges.map(p => p.node)

  const allTagsLink = (
    <FormattedMessage id="tags.allTagsLink" >
      {(txt) => (
        <AllTagsLink
          to={`/${pageContext.langKey}/tags/`}
        >
          {txt}
        </AllTagsLink>
      )}
    </FormattedMessage>
  )

  return (
    <Layout data={data} location={location}>
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
  allMarkdownRemark(limit: 1000,
    sort: {fields: [frontmatter___date], order: DESC},
    filter: {
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
