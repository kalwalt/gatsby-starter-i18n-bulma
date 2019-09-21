const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const ampTemplate = path.resolve('src/templates/home-amp.js');

  return graphql(`
    {
      site{
        siteMetadata{
          languages{
            langs
          }
        }
      }
      markdownRemark{
        frontmatter{
          heading
        }
      }
  all: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
              langKey
              tagSlugs{
                tag
                link
              }
            }
            frontmatter {
              id
              date
              path
              tags
              templateKey
              lang
              title
              heading
            }
          }
        }
      }
  amp: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { glob: "**/src/pages/index.*.md" }
				}
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
                langKey
                tagSlugs{
                  tag
                  link
                }
              }
              frontmatter {
                id
                date
                path
                tags
                templateKey
                lang
                title
                heading
              }
            }
          }
        }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const postsAll = result.data.all.edges

    postsAll.forEach(edge =>{
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Create blog pages
		result.data.amp.edges.forEach(({ node }) => {
        const id = node.id;
			createPage({
				path: `${node.fields.slug}amp/`,
				component:  path.resolve('src/templates/home.amp.js'),
        context: {
           slug: node.fields.slug,
          id,
        },
			})
		})
  })

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  fmImagesToRelative(node) // convert image paths for gatsby images
}

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
