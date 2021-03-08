const languages = require('./src/data/languages');

module.exports = {
  siteMetadata: {
    title: `Gatsby with Bulma and i18n`,
    description: `
  This is a blog theme. The description will be showed in SEO results on pages
  without their own descriptions.
`,
    siteUrl: "https://gatsby-starter-i18n-bulma.netlify.app",
    image: 'img.jpg',
    author: {
      name: 'Your Name',
      minibio: `
        This bio is shown at the bottom of each blog post. It supports
        <strong>custom HTML</strong> if you’re into that sort of thing.
      `,
    },
    organization: {
      name: 'Example, Inc.',
      url: 'https://example.com',
      logo: 'img/logo.svg',
    },
    social: {
      twitter: '@twitter',
      fbAppID: '',
    },
    languages,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          indentedSyntax: true
        }
      }
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false,
      }
    },
    {
    resolve: 'gatsby-plugin-i18n-tags',
    options: { // Default options
      tagPage: 'src/templates/tags.js',
      tagsUrl: '/tags/',
      langKeyForNull: 'any',
    },
  },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
      path: `${__dirname}/src/data/articles`,
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    "gatsby-transformer-javascript-frontmatter",
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
             options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-netlify`,
    {
      resolve:'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true,            // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `KAKI`,
        short_name: `Kaki`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#D64000`,
        display: `standalone`,
        icon: `src/img/icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    `gatsby-plugin-offline`,
  ],
}
