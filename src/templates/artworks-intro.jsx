import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import Features from '../components/Features'
import { FaRegGem } from 'react-icons/fa';

const ArtworkIntroTemplate = ({
  title,
  content,
  contentComponent,
  intro,
  heading,
  tags,
  langKey
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
             <FaRegGem className="menu-names" color="#D64000"/>{heading}
             </h2>
             <section className="section">
               <PageContent className="container content" content={content} />
                 <TagList tags={tags} langKey={langKey}/>
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
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class ArtworksIntroPage extends React.Component {

render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
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
            <ArtworkIntroTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            tags={tags}
            langKey={langKey}
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

export const pageQuery = graphql`query ArtworksIntroQuery($id: String!) {
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
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
      }
      heading
      description
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
    }
  }
}
`
