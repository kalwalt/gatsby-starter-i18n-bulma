import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import { navigate } from "gatsby-link"
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import ContactDetails from "../components/ContactDetails"
import OsmMap from '../components/OsmMap'
import FollowUs from '../components/FollowUs'
import ContactForm from '../components/ContactForm/ContactForm'
import { getCurrentLangKey } from 'ptz-i18n'
import { FormattedMessage } from 'react-intl'


function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function setActionPath(langKey) {
  let path;
  if(langKey==='en'){
    path = '/en/contact/thanks/';
  }else{
    path = '/it/contatto/grazie/';
  }
  return path;
}

const ContactPageTemplate = ({
  title, content, contentComponent,
  image, address, phone, email,
  handleSubmit, handleChange, action
}) => {
  const PageContent = contentComponent || Content
  return (
      <section className="section">
        <div className="container">
          <div className="content">
      <h1 className="title">{title}</h1>
      <PageContent className="container content" content={content} />
      <ContactDetails
      image={image}
      address={address}
      phone={phone}
      email={email}
      />
    <div className="box">
    <h4 className="subtitle"><FormattedMessage id="contact.fill-the-form"/></h4>
      <ContactForm action={action}/>
      </div>
      </div>
      </div>
    </section>
)
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class ContactPage extends React.Component {
    render() {
    let dataMarkdown = [];
    let data;
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
      data = this.props.data;
    }
    const location = this.props.location;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    const action = setActionPath(this.langKey);
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const address = dataMarkdown.frontmatter.address;
    const phone = dataMarkdown.frontmatter.phone;
    const email = dataMarkdown.frontmatter.email;
    const locations = dataMarkdown.frontmatter.locations;
    const { lat } = locations;
    const { lng } = locations;
    const { message } = locations;
    const linkinsta = dataMarkdown.frontmatter.linkinsta;
    const instagram = dataMarkdown.frontmatter.instagram;
    const image = dataMarkdown.frontmatter.imageCardSL;
    const { frontmatter } = dataMarkdown;
    const imageSEO = frontmatter.image.childImageSharp.fluid.src;
    return (
      <Layout className="container"  data={data} jsonData={jsonData} location={location}>
        <SEO
          frontmatter={frontmatter}
          postImage={imageSEO}
        />

            <div className="container">
                <ContactPageTemplate
                contentComponent={HTMLContent}
                image={image}
                address={address}
                phone={phone}
                email={email}
                title={dataMarkdown.frontmatter.title}
                content={dataMarkdown.html}
                action={action}
                 />
            </div>

        <OsmMap lat={lat} lng={lng} message={message}/>
      <FollowUs link={linkinsta} instagram={instagram}/>
    </Layout>
    )
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPageQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allArticlesJson(filter:{title:{eq:"home"}}){
   edges{
     node{
       articles {
         en
         it
       }
     }
   }
  }
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        id
        title
        description
        tags
        lang
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
        address
        phone
        email
        locations{
          lat
          lng
          message
        }
        linkinsta
        instagram
        imageCardSL{
          alt
          image{
            childImageSharp {
              fluid(maxWidth: 128, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          description
          website
        }
      }
      fields {
        slug
      }
    }
  }
`
