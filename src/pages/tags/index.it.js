import React from 'react'
import TagsPageRoute from './_tags'
import { graphql, StaticQuery } from 'gatsby'

export default ({ props }) => (
  <StaticQuery
    query={graphql`
query TagsItQuery {
  allMarkdownRemark(
    limit: 2000
    filter: {
      fields: {
        langKey: {eq: "it"}
      }
    }
  ) {
    group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
  }
}
`}
render={(props) => (
  <TagsPageRoute {...props} />

)}
/>
)
