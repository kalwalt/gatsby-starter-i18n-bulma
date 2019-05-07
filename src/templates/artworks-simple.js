import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/Layout"
import { getCurrentLangKey } from 'ptz-i18n'
import Content, { HTMLContent } from "../components/Content"
import Slider from '../components/Slider'
import Lightbox from '../components/Lightbox'
import InfoCard from '../components/InfoCard'

const ArtworkTemplate = ({
  title,
  content,
  contentComponent,
  heading,

  lightbox,
  images,
  info
}) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1 className="title animated bounceInLeft">{title}</h1>
        <div className="hero">
          <Lightbox lightbox={lightbox} images={images} />
          </div>
          <div className="columns is-multiline">
           <div className="column is-6">
             <h2 className="has-text-weight-semibold subtitle">
             {heading}
             </h2>
             <section className="section">
               <PageContent className="container content" content={content} />
               <InfoCard info={info}/>
             </section>
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
  //const { display } = frontmatter.slider;
  //const { array } = frontmatter.slider;
  const images = frontmatter.lightbox.images;
  const lightbox = frontmatter.lightbox;
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  const { masonry } = frontmatter;
    return (
      <Layout className="container" data={data} jsonData={jsonData} location={this.props.location}>
        <div>
            <ArtworkTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            images={images}
            lightbox={lightbox}
            masonry={masonry}
            info={frontmatter.info}
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
query ArtworksSimpleQuery($id: String!) {
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
      info{
        title
        artworkTitle
        year
        technique
        dimensions
      }
      masonry{
        photos{
          src
          srcSet
          sizes
          width
          height
          link
          title
          alt
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
