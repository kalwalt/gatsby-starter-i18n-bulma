import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/Layout"
import { getCurrentLangKey } from 'ptz-i18n';
import Content, { HTMLContent } from "../components/Content"
import Features from '../components/Features'
import Gallery from '../components/Gallery'
import it from '../data/imageSlider_it'
import en from '../data/imageSlider_en'

const ArtworkTemplate = ({ title, content, contentComponent, intro, heading, langKey }) => {
  const PageContent = contentComponent || Content

  return (

      <div className="container content">
       <h1 className="title">{title}</h1>
        <div className="hero">
          <Gallery en={en} it={it} langKey={langKey} />
          </div>
          <div className="columns">
           <div className="column is-7">
             <h2 className="has-text-weight-semibold subtitle">
             {heading}
             </h2>
             <Features gridItems={intro.blurbs} />
             <PageContent className="content" content={content} />
           </div>
         </div>
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

render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  const { display } = frontmatter.slider;
  console.log(display);
  const url = location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    return (
      <Layout className="container" data={data} location={this.props.location}>
        <div>
            <ArtworkTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            langKey={this.langKey}
            display={display}
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
      slider{
        display
      }
   }
 }
}
`
