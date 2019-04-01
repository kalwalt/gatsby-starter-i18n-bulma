import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/Layout"
import { getCurrentLangKey } from 'ptz-i18n'
import Content, { HTMLContent } from "../components/Content"
import Features from '../components/Features'
import Slider from '../components/Slider'
import Lightbox from '../components/Lightbox'

const ArtworkTemplate = ({ title, content, contentComponent, intro, heading, display, array, lightbox, images }) => {
  const PageContent = contentComponent || Content
  console.log(images);
  return (

      <div className="container content">
       <h1 className="title">{title}</h1>
        <div className="hero">
          <Slider array={array} display={display}/>
          </div>
          <div className="columns">
           <div className="column is-7">
             <h2 className="has-text-weight-semibold subtitle">
             {heading}
             </h2>
             <Features gridItems={intro.blurbs} />
             <Lightbox lightbox={lightbox} images={images} />
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
  array: PropTypes.array,
  images: PropTypes.arrayOf(PropTypes.object),
  lightbox: PropTypes.object,
}

class ArtworksPage extends React.Component {

render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  const { display } = frontmatter.slider;
  const { array } = frontmatter.slider;
  const images = frontmatter.lightbox.images;
  console.log(images);
  const lightbox = frontmatter.lightbox;
    return (
      <Layout className="container" data={data} location={this.props.location}>
        <div>
            <ArtworkTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            display={display}
            array={array}
            images={images}
            lightbox={lightbox}
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
        array{
          original
          thumbnail
          originalAlt
          originalTitle
          description
        }
      }
      lightbox {
        display
        images{
         id
         relativePath
         childImageSharp {
           fluid(maxWidth: 640, quality: 85) {
             ...GatsbyImageSharpFluid
             src
             sizes
            }
          }
        }
      }
    }
  }
}
`
