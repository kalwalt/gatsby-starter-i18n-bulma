import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/Layout"
import { getCurrentLangKey } from 'ptz-i18n'
import Content, { HTMLContent } from "../components/Content"
import Features from '../components/Features'

const ArtworkIntroTemplate = ({
  title,
  content,
  contentComponent,
  intro,
  heading
}) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1 className="title animated bounceInLeft">{title}</h1>
        <div className="hero">
            <Features gridItems={intro.blurbs} />
          </div>
          <div className="columns">
           <div className="column is-6">
             <h2 className="has-text-weight-semibold subtitle">
             {heading}
             </h2>
             <section className="section">
               <PageContent className="container content" content={content} />
             </section>
           </div>
         </div>
      </div>
    )
}

ArtworkIntroTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

class ArtworksIntroPage extends React.Component {

render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  const jsonData = data.allArticlesJson.edges[0].node.articles;
    return (
      <Layout className="container" data={data} jsonData={jsonData} location={this.props.location}>
        <div>
            <ArtworkIntroTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            />
        </div>
      </Layout>
    )
  }
}

ArtworksIntroPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ArtworksIntroPage

export const pageQuery = graphql`
query ArtworksIntroQuery($id: String!) {
  site {
     siteMetadata {
       languages {
         defaultLangKey
         langs
       }
     }
   }
   allArticlesJson(filter: {title: {eq: "home"}}) {
     edges {
       node {
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
       image {
         childImageSharp {
           fluid(maxWidth: 2048, quality: 100) {
             ...GatsbyImageSharpFluid
           }
         }
       }
       heading
       description
       intro {
         blurbs {
           image {
             childImageSharp {
               fluid(maxWidth: 240, quality: 64) {
                 ...GatsbyImageSharpFluid
               }
             }
           }
           text
         }
       }
     }
   }
}
`
