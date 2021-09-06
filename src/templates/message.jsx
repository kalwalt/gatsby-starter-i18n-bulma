import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

const MessagePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1 className="title">{title}</h1>
        <section className="section">
          <PageContent className="content" content={content} />
        </section>
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
    let dataMarkdown = [];
    let data;
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
      data = this.props.data;
    }
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    return (
      <Layout className="container" data={data} jsonData={jsonData} location={this.props.location}>
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
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        id
        title
        description
      }
      fields {
        slug
      }
    }
  }
`
