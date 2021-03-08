import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import Lightbox from '../components/Lightbox'
import InfoCard from '../components/InfoCard'

const ArtworkSimpleTemplate = ({
  title,
  content,
  contentComponent,
  heading,
  lightbox,
  images,
  info,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  return (
    <div className="content">
     <h1 className="title animated bounceInLeft">{title}</h1>
      <div className="hero">
        <Lightbox lightbox={lightbox} images={images} />
        </div>
        <div className="section">
          <h2 className="has-text-weight-semibold subtitle">
          {heading}
          </h2>
        </div>
        <div className="columns">
         <div className="column is-4">
           <section className="section">
             <InfoCard info={info}/>
              <TagList tags={tags} langKey={langKey}/>
           </section>
         </div>
         <div className="column is-6">
            <PageContent className="section" content={content} />
         </div>
       </div>
    </div>
    )
}

ArtworkSimpleTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  array: PropTypes.array,
  //images: PropTypes.arrayOf(PropTypes.object),
  lightbox: PropTypes.object,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class ArtworksSimplePage extends React.Component {

render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  //const { display } = frontmatter.slider;
  //const { array } = frontmatter.slider;
  const images = frontmatter.lightbox.images;
  const lightbox = frontmatter.lightbox;
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  const { masonry } = frontmatter;
  const image = frontmatter.image.childImageSharp.gatsbyImageData.src;
  const langKey = frontmatter.lang;
  const tags = frontmatter.tags;
    return (
      <Layout className="container" data={data} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <ArtworkSimpleTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            images={images}
            lightbox={lightbox}
            masonry={masonry}
            info={frontmatter.info}
            tags={tags}
            langKey={langKey}
            />
        </div>
      </Layout>
    )
  }
}

ArtworksSimplePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ArtworksSimplePage

export const pageQuery = graphql`query ArtworksSimpleQuery($id: String!) {
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
      tags
      lang
      image {
        childImageSharp {
          gatsbyImageData(quality: 86, layout: FULL_WIDTH)
        }
      }
      heading
      description
      info {
        title
        artworkTitle
        year
        technique
        dimensions
      }
      masonry {
        photos {
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
      slider {
        display
        array {
          original
          thumbnail
          originalAlt
          originalTitle
          description
        }
      }
      lightbox {
        display
        images {
          image {
            childImageSharp {
              gatsbyImageData(quality: 85, layout: FULL_WIDTH)
            }
          }
          alt
        }
      }
    }
  }
}
`
