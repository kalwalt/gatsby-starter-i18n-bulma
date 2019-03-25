import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';

const switchData = (data, langKey) => {
  var posts;
  switch(langKey){
    case('en'):
     return posts = data.en;
    break;
    case('it'):
     return posts = data.it;
    break;
    default: return ' ';
  }
  return posts;
}

const propTypes = {
  data: PropTypes.object.isRequired,
}

const BlogRollKey = (langkey) => {

  return(
    {langkey}
  )
}


class BlogRoll extends React.Component {

  render() {
    const itEdges = this.props.data.it.edges
    const  data  = this.props.data;
    //console.log(data.markdownRemark.frontmatter.lang);
    const langKey = this.props.langKey;
    console.log(langKey);
    console.log(data.it);
    //console.log(this.props.location);
    //console.log(switchData(data, 'en'));
    const { edges: posts} = switchData(data, langKey);
    //console.log(posts);


    return (
      <div className="columns is-multiline">
      {posts && (posts
          .map(({ node: post }) => (
            <div
              className="is-parent column is-6"
              key={post.id}
            >
            <article className="tile is-child box notification">
              <p>
                <Link className="title has-text-primary is-size-4" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
                <span> &bull; </span>
                <span className="subtitle is-size-5 is-block">{post.frontmatter.date}</span>
              </p>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link className="button" to={post.fields.slug}>
                  Keep Reading →
                </Link>
              </p>
              </article>
            </div>
          )))}
          </div>
    );
  }
}
/*
BlogRoll.propTypes = {
  data: PropTypes.object.isRequired,
 langKey: PropTypes.string,
}
*/
BlogRoll.propTypes = propTypes

export default BlogRoll

export const pageQuery = graphql`
query BlogRollQuery {
  site {
    siteMetadata {
      title
      languages {
        langs
        defaultLangKey
      }
    }
  }
  markdownRemark {
    frontmatter {
      id
      lang
    }
  }
  en: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}, lang: {regex: "/(en any)/"}}}) {
    edges {
      node {
        excerpt(pruneLength: 400)
        id
        fields {
          slug
        }
        frontmatter {
          title
          templateKey
          date
          lang
        }
      }
    }
  }
  it: allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "blog-post"}, lang: {regex: "/(it any)/"}}}) {
    edges {
      node {
        excerpt(pruneLength: 400)
        id
        fields {
          slug
        }
        frontmatter {
          title
          templateKey
          date
          lang
        }
      }
    }
  }
}
`
