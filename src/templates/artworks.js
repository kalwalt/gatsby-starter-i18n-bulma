import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
import Features from '../components/Features'

const ArtworkTemplate = ({ title, content, contentComponent, intro, heading, }) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1>{title}</h1>
       {heading}
       <Features gridItems={intro.blurbs} />
      <PageContent className="content" content={content} />
      </div>
)
}

ArtworkTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

class ArtworksPage extends React.Component {
//const ArtworksPage = ({ data, props }) => {
render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  console.log(this.props.location);
    return (
      <Layout className="container" data={data} location={this.props.location}>
        <div style={{ marginBottom: rhythm(2) }}>
            <ArtworkTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.html}
            intro={frontmatter.intro}
            />
        </div>
      </Layout>
    )
}
}

ArtworksPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
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
   markdownRemark(id: { eq: $id }) {
     frontmatter {
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
