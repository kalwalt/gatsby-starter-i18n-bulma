import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"

const TagsPage = ({
data, location
}) => (
  <Layout data={data} location={location}>
  <section className="section">
  <div className="container content">
    <div>
      <h1 className="title">Tags</h1>
      <div className="tags">
        {data.allMarkdownRemark.group.map(tag => (
            <span key={tag.fieldValue} className="tag is-light is-small">
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
            </span>
        ))}
      </div>
    </div>
  </div>
  </section>
  </Layout>
)

TagsPage.propTypes = {
  props: PropTypes.string,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
query {
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
  allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
    edges {
      node {
        frontmatter {
          id
          title
          slug
        }
      }
    }
  }
}

`
