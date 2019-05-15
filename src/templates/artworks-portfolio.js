import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import MasonryGal from "../components/Masonry/MasonryGal"

const ArtworkPortfolioTemplate = ({
  title,
  content,
  contentComponent,
  intro,
  heading,
  masonry
}) => {
  const PageContent = contentComponent || Content
  return (
      <div className="container content">
       <h1 className="title animated bounceInLeft">{title}</h1>
        <div className="hero">
          {masonry &&
            <MasonryGal photos={masonry.photos}/>
          }
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

ArtworkPortfolioTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class ArtworksPortfolioPage extends React.Component {

render() {
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  const { masonry } = frontmatter;
  const image = frontmatter.image.childImageSharp.fluid.src;
    return (
      <Layout className="container" data={data} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <ArtworkPortfolioTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            masonry={masonry}
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

export const pageQuery = graphql`
query ArtworksPortfolioQuery($id: String!) {
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
             src
           }
         }
       }
       heading
       description
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
    }
  }
}
`
