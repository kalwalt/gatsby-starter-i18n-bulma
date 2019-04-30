import React from 'react'
import TagsPageRoute from './_tags'
import { graphql } from 'graphql'

export default ({props}) => <TagsPageRoute {...props} />

export const pageQuery = graphql`
query TagsItQuery {
  allMarkdownRemark(
    limit: 2000
    filter: {
      frontmatter: { draft: { ne: true } } ,
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
`
