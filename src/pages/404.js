import React from 'react'
import Layout from '../components/Layout'
import { FormattedMessage } from 'react-intl'
import PropTypes from "prop-types"
import { graphql } from 'gatsby'

const NotFoundPage = ({
data, location
}) => {
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  return(
  <Layout data={data} jsonData={jsonData} location={location}>
  <React.Fragment>
    <div className="container content">
      <h1 className="title is-size-2 has-text-weight-bold is-bold-light"><FormattedMessage id="not_found" /></h1>
      <p className="is-medium"><FormattedMessage id="404" /></p>
    </div>
    </React.Fragment>
  </Layout>
)
}

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
    allArticlesJson(filter:{title:{eq:"home"}}){
   edges{
     node{
       articles {
         en
         it
       }
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
