import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import Slider from '../components/Slider'
import Testimonials from '../components/Testimonials'
import Features from '../components/Features'

const ArtworkTemplate = ({
  title,
  content,
  contentComponent,
  intro,
  heading,
  description,
  display,
  array,
  testimonials,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1 className="title animated bounceInLeft">{title}</h1>
        <div className="hero">
          <Slider array={array} display={display}/>
            <div className="section">
              <h2 className="has-text-weight-semibold subtitle">
              {heading}
              </h2>
              <div className="container content">
                {description}
               </div>
             </div>
             <Features gridItems={intro.blurbs} />
          </div>
             <div className="container content">
               <Testimonials testimonials={testimonials} />
             </div>
             <section className="section">
               <PageContent className="container content" content={content} />
                <TagList tags={tags} langKey={langKey}/>
             </section>
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
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class ArtworksPage extends React.Component {

render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  const { display } = frontmatter.slider;
  const { array } = frontmatter.slider;
  const description = frontmatter.headingDesc;
  const jsonData = data.allArticlesJson.edges[0].node.articles;
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
            <ArtworkTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            display={display}
            array={array}
            description={description}
            testimonials={frontmatter.testimonials}
            tags={tags}
            langKey={langKey}
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

export const pageQuery = graphql`query ArtworksQuery($id: String!) {
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
      description
      tags
      lang
      image {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
      }
      heading
      headingDesc
      description
      testimonials {
        author
        quote
      }
      intro {
        blurbs {
          image {
            childImageSharp {
              gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
            }
          }
          heading
          link
          text
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
    }
  }
}
`
