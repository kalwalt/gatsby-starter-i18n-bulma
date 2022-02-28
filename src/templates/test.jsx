import React from 'react';
import * as PropTypes from 'prop-types';
import { getSrc } from 'gatsby-plugin-image';
import TagList from '../components/TagList';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO/SEO';
import Content, { HTMLContent } from '../components/Content';

const TestTemplate = ({
  title,
  content,
  contentComponent,
  lightbox,
  images,
  tags,
  langKey,
}) => {
  const PageContent = contentComponent || Content;
  return (
    <div className="container content">
      <h1 className="title animated bounceInLeft">{title}</h1>
      <section className="section">
        <PageContent className="container content" content={content} />
        <Lightbox lightbox={lightbox} images={images} />
        <TagList tags={tags} langKey={langKey} />
      </section>
    </div>
  );
};

TestTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string,
};

const Test = ({data}) => {

    const { frontmatter } = data.markdownRemark;
    console.log(frontmatter);
    const image = frontmatter.image;
    const postImage = getSrc(image) || image;
    const images = frontmatter.lightbox.images;
    const lightbox = frontmatter.lightbox;
    const langKey = frontmatter.lang;
    const tags = frontmatter.tags;
    return (
      <Layout
        className="container"   
      >
        <SEO frontmatter={frontmatter} postImage={postImage} />
        <div>
          <TestTemplate
            contentComponent={HTMLContent}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            lightbox={lightbox}
            images={images}
            tags={tags}
            langKey={langKey}
          />
        </div>
      </Layout>
    );
}

Test.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Test;

export const pageQuery = graphql`
  query TestQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allArticlesJson(filter: { title: { eq: "home" } }) {
      edges {
        node {
          articles {
            en
            it
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        id
        title
        description
        tags
        lang
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        lightbox {
          display
          images {
            image {
              childImageSharp {
                gatsbyImageData(quality: 85, layout: FULL_WIDTH)
              }
            }
            alt
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
