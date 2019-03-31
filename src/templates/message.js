import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

const MessagePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1>{title}</h1>
      <PageContent className="content" content={content} />
      </div>
)
}

MessagePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class MessagePage extends React.Component {

  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
    }
    return (
      <Layout className="container" data={this.props.data} location={this.props.location}>
        <div>
            <MessagePageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
             />
        </div>
      </Layout>
    )
  }
}

MessagePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default MessagePage

export const pageQuery = graphql`
  query MessagePageQuery($id: String!) {
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
