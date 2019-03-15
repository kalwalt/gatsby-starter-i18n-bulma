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
  <div>
    <div>
      <h1>Tags</h1>
      <ul>
        {data.allMarkdownRemark.group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
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
