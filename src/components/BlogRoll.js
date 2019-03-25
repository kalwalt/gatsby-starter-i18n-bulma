import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { FormattedMessage } from 'react-intl';

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

class BlogRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: '/en/blog/'};
  }

  getUrl(){
    this.setState({url: window.location.pathname});
  }

  componentDidMount(){
    this.getUrl();
  }

  render() {
    const { data } = this.props;
    const langKey = this.state.url.slice(1, 3);
    const { edges: posts} = switchData(data, langKey);

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
                  <FormattedMessage id="keep-reading"/>
                </Link>
              </p>
              </article>
            </div>
          )))}
          </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (langKey) => (
  <StaticQuery
    query={graphql`
    query BlogRollQuery {
      site {
        siteMetadata {
          title
          languages{
            langs
            defaultLangKey
          }
        }
      }
      en: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "blog-post" },
                                 lang: { regex: "/(en|any)/" }}}
      ) {
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
      it: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "blog-post" },
                                 lang: { regex: "/(it|any)/" }}}
      ) {
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
    `}
    render={(data) => (
      <BlogRoll data={data}/>

  )}
  />
)
