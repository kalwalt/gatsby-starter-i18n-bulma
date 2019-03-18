import React from 'react'
import Layout from '../components/Layout'
import { FormattedMessage } from 'react-intl'
import PropTypes from "prop-types"
import { graphql } from 'gatsby'

export const frontmatter = {
  id:  '09',
  title: "404 page",
}

const NotFoundPage = ({
data, location
}) => (
  <Layout data={data} location={location}>
  <React.Fragment>
    <div>
      <h1><FormattedMessage id="not_found" /></h1>
      <p>....</p>
    </div>
    </React.Fragment>
  </Layout>
)

NotFoundPage.propTypes = {
data: PropTypes.object.isRequired,
location: PropTypes.object.isRequired,
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPageQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    markdownRemark {
      html
      frontmatter {
        id
        title
      }
      fields {
        slug
      }
    }
}
`
