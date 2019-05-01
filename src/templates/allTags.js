import React from "react"
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { getCurrentLangKey } from 'ptz-i18n';
import kebabCase from 'lodash/kebabCase'
import { FormattedMessage } from 'react-intl'
import Helmet from 'react-helmet'
import Layout from "../components/LayoutTag"

const AllTagsPageTemplate = ({ props }) => {
  const allTags = props.allMarkdownRemark.group;
  const url = location.pathname;
  const { langs, defaultLangKey } = props.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  return (
    <section className="section">
      <FormattedMessage id="tags">
        {(txt) => (
          <header className="section">
            <Helmet
              title={txt}
              meta={[{ name: 'description', content: txt }]}
            />
            <h1 className="title">
              {txt}
            </h1>
          </header>
        )}
      </FormattedMessage>
      <nav className="content">
        <ul className="taglist">
          {allTags.map(tag =>
            <li className="tag is-light is-small" key={tag.fieldValue}>
              <Link
                style={{
                  textDecoration: 'none',
                }}
                to={`${langKey}/tags/${kebabCase(tag.fieldValue)}/`}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </section>
)
}

AllTagsPageTemplate.propTypes = {

  data: PropTypes.object,
}

class AllTagsPage extends React.Component {

  render() {
    var data;
    if (this.props.data !== null) {
      data = this.props.data
      console.log(data);
    }
    return (
      <Layout className="container" data={this.props.data} location={this.props.location}>
        <div className="content">
            <AllTagsPageTemplate
            props={data}
             />
        </div>
      </Layout>
    )
  }
}

AllTagsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AllTagsPage

export const pageQuery = graphql`
  query AllTagsPageQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    markdownRemark(id: {eq: $id}){
      frontmatter{
        title
      }
    }
 allMarkdownRemark(limit: 2000,
   filter: {
     frontmatter: { templateKey: { eq: "blog-post" }}
     fields: {
       langKey: {
         eq: "en"
       }
     }
   }) {
   edges {
     node {
       frontmatter {
         title
       }
     }
   }
   group(field: frontmatter___tags) {
     fieldValue
     totalCount
   }
 }
}
`
