import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll_it'
import { graphql } from 'gatsby'

export const frontmatter = {
  id:  '02',
  title: "pagina blog",
}


export default class BlogIndexPage extends React.Component {

  render() {
    const data = this.props.data;
    const location = this.props.location;

  return (
      <Layout data={data} location={location}>
        <section className="section">
          <div className="container">
            <div className="content">
            <div
                className="full-width-image-container margin-top-0"
                style={{
                  backgroundImage: `url('/img/blog-index.jpg')`,
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
                  Ultime Notizie
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
  query BlogIndexIt
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
    allJavascriptFrontmatter {
    edges {
      node {
        frontmatter {
          id
          title
        }
      }
    }
  }
    markdownRemark
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
