import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll_en'
import { graphql } from 'gatsby'

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
                  Latest Stories
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

export const pageQuery = graphql`
  query BlogIndexEn
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
    markdownRemark
     {
      id
      html
      frontmatter {
        date
        title
        description
        tags
        lang
      }
    }
  }
`
