import React from 'react';
import * as PropTypes from 'prop-types';
import { getSrc } from 'gatsby-plugin-image';
import TagList from '../components/TagList';
import { graphql } from 'gatsby';
import LayoutTest from '../components/LayoutTest';
import SEO from '../components/SEO/SEO';
import Content, { HTMLContent } from '../components/Content';

const AboutPageTemplate = ({
  title,
  content,
  contentComponent,
  tags,
  langKey,
}) => {
  const PageContent = contentComponent || Content;
  return (
    <div className="container content">
      <h1 className="title animated bounceInLeft">{title}</h1>
      <section className="section">
        <PageContent className="container content" content={content} />
        <TagList tags={tags} langKey={langKey} />
      </section>
    </div>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string,
};

class AboutPage extends React.Component {
  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      console.log(this.props.data);
      dataMarkdown = this.props.data.markdownRemark;
    }
    const jsonData = this.props.data.allArticlesJson.edges[0].node.articles;
    const { frontmatter } = dataMarkdown;
    console.log(frontmatter);
    const image = frontmatter.image;
    const postImage = getSrc(image) || image;
    const langKey = frontmatter.lang;
    const tags = frontmatter.tags;
    console.log(this.props.location);
    return (
      <LayoutTest
        className="container"
        data={this.props.data}
        jsonData={jsonData}
        location={this.props.location}
      >
        <SEO frontmatter={frontmatter} postImage={postImage} />
        <div>
          <AboutPageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            tags={tags}
            langKey={langKey}
          />
        </div>
      </LayoutTest>
    );
  }
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPageTestQuery($id: String!) {
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
      }
      fields {
        slug
      }
    }
  }
`;
