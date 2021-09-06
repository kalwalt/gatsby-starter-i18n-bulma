import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import SEO from '../components/SEO/SEO'
import { FormattedMessage } from 'react-intl';
import { graphql } from 'gatsby'

export default class BlogIndexPage extends React.Component {

  render() {
    const data = this.props.data;
    const location = this.props.location;
    const jsonData = data.allArticlesJson.edges[0].node.articles;

  return (
      <Layout data={data} jsonData={jsonData} location={location}>
      <SEO
        frontmatter={data.markdownRemark.frontmatter}
        />
      <section className="content">
          <div className="container">
            <div className="content">
            <div
                className="full-width-image-container margin-top-0"
                style={{
                  backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/3/34/Persimmons_yamagata_2005-10.JPG')`,
                }}
              >
                <h1
                  className="has-text-weight-bold is-size-1"
                  style={{
                    boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
                    backgroundColor: '#f40',
                    color: 'white',
                    padding: '1rem',
                  }}
                >
                  <FormattedMessage id="blog-message" />
                </h1>
              </div>
            </div>
             <BlogRoll />
            </div>
        </section>
      </Layout>
    )
  }
}

BlogIndexPage.propTypes = {
  location: PropTypes.shape({
   pathname: PropTypes.string.isRequired,
 }).isRequired,
}

export const pageQuery = graphql`
  query BlogIndex($id: String!)
   {
    site {
      siteMetadata {
        title
        languages{
          langs
          defaultLangKey
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
    markdownRemark(id: { eq: $id })
     {
      id
      html
      frontmatter {
        id
        date
        title
        description
        tags
        lang
      }
    }
}
`
