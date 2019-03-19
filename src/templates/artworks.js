import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

const ArtworkTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1>{title}</h1>
      <PageContent className="content" content={content} />
      </div>
)
}

ArtworkTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class ArtworksPage extends React.Component {

  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
    }
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div style={{ marginBottom: rhythm(2) }}>
            <ArtworkTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            />
        </div>
      </Layout>
    )
  }
}

ArtworksPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ArtworksPage

export const pageQuery = graphql`
  query ArtworksQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    markdownRemark(id: {eq: $id}) {
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
