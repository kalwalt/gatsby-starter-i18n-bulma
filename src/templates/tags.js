import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout className="container" data={data} location={location}>
    <div className="container content">
      <h1 className="title">{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { path, title } = node.frontmatter
          return (
            <li key={path}>
              <span className="tag is-light is-small">
              <Link to={path}>{title}</Link>
              </span>
            </li>
          )
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
      <Link to="/tags">All tags</Link>
    </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
query ($tag: String) {
  site {
    siteMetadata {
      title
      languages {
        langs
        defaultLangKey
      }
    }
  }
  markdownRemark {
    frontmatter {
      id
    }
  }
  allMarkdownRemark(limit: 2000, sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {tags: {in: [$tag]}}}) {
    totalCount
    edges {
      node {
        frontmatter {
          id
          title
          date
          path
        }
      }
    }
  }
}
`
