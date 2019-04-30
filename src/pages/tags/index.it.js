import React from 'react'
import TagsPageRoute from './_tags'
import { graphql } from 'graphql'

export default ({props}) => <TagsPageRoute {...props} />

export const pageQuery = graphql`
  query TagsItQuery {
    allMarkdownRemark{
      edges{
        node{
          frontmatter{
            title
          }
          fields{
            tagSlugs {
              tag
              link
            }
          }
        }
      }
    }
  }
`
