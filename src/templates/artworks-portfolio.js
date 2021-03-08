import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import MasonryGal from "../components/Masonry/MasonryGal"

const ArtworkPortfolioTemplate = ({
  content,
  contentComponent,
  intro,
  heading,
  masonry,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  return (
      <div className="content">
        <section className="hero is-info">
          <div className="hero-body">
            <div className="content">
          {masonry &&
            <MasonryGal photos={masonry.photos}/>
          }
          </div>
          </div>
        </section>
          <div className="container">
           <div className="content">
             <hr/>
             <h1 className="title animated bounceInLeft">{heading}</h1>
             <section className="section">
               <PageContent className="container content" content={content} />
                  <TagList tags={tags} langKey={langKey}/>
             </section>
           </div>
         </div>
       </div>

    )
}

ArtworkPortfolioTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class ArtworksPortfolioPage extends React.Component {

render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  const { masonry } = frontmatter;
  const image = frontmatter.image.childImageSharp.gatsbyImageData.src;
  const langKey = frontmatter.lang;
  const tags = frontmatter.tags;
    return (
      <Layout className="content" data={data} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <ArtworkPortfolioTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            masonry={masonry}
            tags={tags}
            langKey={langKey}
            />
        </div>
      </Layout>
    )
  }
}

ArtworksPortfolioPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ArtworksPortfolioPage

export const pageQuery = graphql`query ArtworksPortfolioQuery($id: String!) {
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
    }
  }
}
`
