import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'

export const frontmatter = {
  id:  '10',
  title: "404 page",
}

const NotFoundPage = (props) => (
  <Layout data={props.data} location={props.location}>
  <React.Fragment>
    <div>
      <h1>NON TROVATO</h1>
      <p>Sei arrivato ad una pagina che non esiste...</p>
    </div>
    </React.Fragment>
  </Layout>
)

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPageQueryIt {
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
