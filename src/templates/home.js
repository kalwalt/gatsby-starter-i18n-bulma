import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
import IconMenu from '../components/IconMenu'
import iconLinks from '../data/artworksMenu'
import select from '../components/utils'

const HomePageTemplate = ({ title, content, contentComponent, firstLink, secondLink, thirdLink, fourthLink }) => {
  const PageContent = contentComponent || Content

  return (
      <div className="container content">
       <h1 className="title animated bounceInLeft">{title}</h1>
       <IconMenu
       firstLink={firstLink}
       secondLink={secondLink}
       thirdLink={thirdLink}
       fourthLink={fourthLink}
       />
        <section className="section">
          <PageContent className="container content" content={content} />
        </section>
      </div>
)
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class HomePage extends React.Component {

  render() {
    let data;
    let dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
      data = this.props.data;
    }
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const langKey = dataMarkdown.frontmatter.lang
    const sel = select(langKey);


    return (
      <Layout className="container" data={this.props.data} jsonData={jsonData} location={this.props.location}>
        <div>
            <HomePageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            firstLink={iconLinks.painting[sel]}
            secondLink={iconLinks.sculpture[sel]}
            thirdLink={iconLinks.performance[sel]}
            fourthLink={iconLinks.interactivity[sel]}
             />
        </div>
      </Layout>
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery($id: String!) {
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
        lang
      }
      fields {
        slug
      }
    }
  }
`
