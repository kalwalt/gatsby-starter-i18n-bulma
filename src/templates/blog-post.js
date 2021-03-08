import React from 'react'
import PropTypes from 'prop-types'
import TagList from '../components/TagList'
import Helmet from 'react-helmet'
import SEO from '../components/SEO/SEO'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  data,
  location,
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  langKey,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            <TagList tags={tags} langKey={langKey}/>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  location: PropTypes.string,
  tags: PropTypes.array,
  langKey: PropTypes.string
}

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  const langKey = post.frontmatter.lang;
  const image = post.frontmatter.image.childImageSharp.gatsbyImageData.src;

  return (
    <Layout className="container" data={data} jsonData={jsonData} location={location}>
     <SEO
       frontmatter={post.frontmatter}
       postImage={image}
       isBlogPost
     />
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            titleTemplate="%s | Blog"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        langKey={langKey}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
  location: PropTypes.shape({
   pathname: PropTypes.string.isRequired,
 }).isRequired,
}

export default BlogPost

export const pageQuery = graphql`query BlogPostByID($id: String!) {
  site {
    siteMetadata {
      title
      languages {
        langs
        defaultLangKey
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
    id
    html
    frontmatter {
      id
      title
      image {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
      description
      date
      tags
      lang
    }
  }
}
`
