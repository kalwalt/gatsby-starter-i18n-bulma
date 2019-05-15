import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import PostList from '../components/PostList'
import { FormattedMessage } from 'react-intl'
import Helmet from 'react-helmet'
import Layout from "../components/LayoutTag"
import { FaTag, FaTags } from 'react-icons/fa'

const TagRouteTemplate = ({ data, pageContext }) => {

  const posts = data.allMarkdownRemark.edges.map(p => p.node)

  const allTagsLink = (
    <FormattedMessage id="tags.allTagsLink" >
      {(txt) => (
        <Link
          to={`/${pageContext.langKey}/tags/`}
        >
        <FaTags className="menu-names"/>  {txt}
        </Link>
      )}
    </FormattedMessage>
  )

  return (
    <section className="section">
      <div className="container content">
        <header className="title is-size-3 has-text-weight-bold is-bold-light">
          <FormattedMessage id="tags">
            {(txt) => (
              <Helmet
                title={`${pageContext.tag} | ${txt}`}
                meta={[{ name: 'description', content: txt }]}
              />
            )}
          </FormattedMessage>
          <FormattedMessage
            id="tags.nPostsTaggedWith"
            values={{ nPosts: data.allMarkdownRemark.totalCount }}
          />
          <div className="content">
          <span className="tag is-light is-medium"><FaTag className="menu-names"/>{pageContext.tag}</span>
          </div>
          {allTagsLink}
        </header>
        <PostList
          posts={posts}
        />
        <footer className="footer">
          <span className="tag is-light is-medium">
          {allTagsLink}
          </span>
        </footer>
      </div>
    </section>
  )
}

TagRouteTemplate.propTypes = {
  posts: PropTypes.object,
  pageContext: PropTypes.object
}

class TagRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location:  { pathname: "" },
  };
  }
  componentDidMount(){
    if (typeof window !== 'undefined'){
    this.state = {location:  {pathname: window.location.pathname}};
  }
  }

  render() {
    let data;
    let pageContext;
    if (this.props.data !== null) {
      data = this.props.data;
      pageContext = this.props.pageContext;
    }

    return(
      <Layout data={data} location={this.state.location}>
      <TagRouteTemplate data={data} pageContext={pageContext}></TagRouteTemplate>
      </Layout>

    )

  }
}

export default TagRoute

export const pageQuery = graphql`
query TagPage($langKey: String!, $tag: String!) {
  site {
    siteMetadata {
      languages {
        langs
        defaultLangKey
      }
    }
  }
  markdownRemark {
    frontmatter {
      title
      slug
    }
  }
  allMarkdownRemark(limit: 1000, sort: {fields: [frontmatter___date], order: DESC},
    filter: {frontmatter: {templateKey: {ne: "message"}, lang: {eq: $langKey}},
    fields: {
    langKey: {eq: $langKey},
    tagSlugs: {elemMatch: {tag: {eq: $tag}}}
  }}) {
    totalCount
    edges {
      node {
        frontmatter {
          title
          description
          date
          slug
        }
        fields {
          langKey
          slug
          tagSlugs {
            tag
            link
          }
        }
        excerpt
      }
    }
  }
}
`
