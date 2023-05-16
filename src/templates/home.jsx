import React from 'react';
import * as PropTypes from 'prop-types';
import FullWidthImage from '../components/FullWidthImage';
import { getImage, getSrc } from 'gatsby-plugin-image';
import TagList from '../components/TagList';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO/SEO';
import Content, { HTMLContent } from '../components/Content';
import IconMenu from '../components/IconMenu';
import iconLinks from '../data/artworksMenu';
import select from '../components/utils';
import SlickSlider from '../components/SlickComponents/SlickSlider';
import Banner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import CardSlide from '../components/CardSlide';

const HomePageTemplate = ({
  imageCardSL,
  image,
  heading,
  display,
  array,
  mainpitch,
  main,
  testimonials,
  title,
  content,
  contentComponent,
  firstLink,
  secondLink,
  thirdLink,
  fourthLink,
  subheading,
  tags,
  langKey,
}) => {
  const PageContent = contentComponent || Content;
  const heroImage = getImage(image) || image;

  return (
    <div>
      
      <FullWidthImage img={heroImage} title={title} subheading={subheading} />
      
      <SlickSlider />
      <Banner main={main.image1} mainpitch={mainpitch} />
      <div className="container section">
        <IconMenu
          firstLink={firstLink}
          secondLink={secondLink}
          thirdLink={thirdLink}
          fourthLink={fourthLink}
        />
      </div>
      <div className="section">
        <Testimonials testimonials={testimonials} />
      </div>
      <CardSlide
        imageInfo={imageCardSL}
        name={imageCardSL.name}
        description={imageCardSL.description}
        website={imageCardSL.website}
      />
      <section className="section">
        <PageContent className="container content" content={content} />
        <TagList tags={tags} langKey={langKey} />
      </section>
    </div>
  );
};

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  subheading: PropTypes.string,
  tags: PropTypes.array,
  langKey: PropTypes.string,
};

class HomePage extends React.Component {
  render() {
    let data;
    let dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
      data = this.props.data;
    }
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const langKey = dataMarkdown.frontmatter.lang;
    const { frontmatter } = data.markdownRemark;
    const { display } = frontmatter.slider;
    const { array } = frontmatter.slider;
    const sel = select(langKey);
    const image = frontmatter.image;
    const postImage = getSrc(image) || image;
    const tags = frontmatter.tags;

    return (
      <Layout
        className="content"
        data={this.props.data}
        jsonData={jsonData}
        location={this.props.location}
      >
        <SEO frontmatter={frontmatter} postImage={postImage} />
        <div>
          <HomePageTemplate
            imageCardSL={dataMarkdown.frontmatter.imageCardSL}
            image={dataMarkdown.frontmatter.image}
            heading={dataMarkdown.frontmatter.heading}
            subheading={dataMarkdown.frontmatter.subheading}
            display={display}
            array={array}
            mainpitch={dataMarkdown.frontmatter.mainpitch}
            main={dataMarkdown.frontmatter.main}
            testimonials={dataMarkdown.frontmatter.testimonials}
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            firstLink={iconLinks.painting[sel]}
            secondLink={iconLinks.sculpture[sel]}
            thirdLink={iconLinks.performance[sel]}
            fourthLink={iconLinks.interactivity[sel]}
            tags={tags}
            langKey={langKey}
          />
        </div>
      </Layout>
    );
  }
}

HomePage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  data: PropTypes.object.isRequired,
};

export default HomePage;

export const Head = () => (
  <>
    <link href='//cdnjs.cloudflare.com/' rel='preconnect' crossorigin />
    <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
  </>
)

export const pageQuery = graphql`
  query HomePageQuery($id: String!) {
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
        heading
        subheading
        mainpitch {
          heading
          subheading
          title
          description
          link
        }
        slider {
          display
          array {
            original
            thumbnail
            originalAlt
            originalTitle
            description
          }
        }
        imageCardSL {
          alt
          image {
            childImageSharp {
              gatsbyImageData(width: 128, quality: 84, layout: CONSTRAINED)
            }
          }
          name
          description
          website
        }
        main {
          image1 {
            alt
            image {
              childImageSharp {
                gatsbyImageData(width: 500, quality: 90, layout: CONSTRAINED)
              }
            }
          }
        }
        testimonials {
          author
          quote
        }
      }
      fields {
        slug
      }
    }
  }
`;
