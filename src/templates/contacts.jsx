import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import { navigate } from "gatsby-link";
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import ContactDetails from "../components/ContactDetails"
import OsmMap from '../components/OsmMap'
import FollowUs from '../components/FollowUs'
import { getCurrentLangKey } from 'ptz-i18n';
import { FormattedMessage } from 'react-intl';


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
      <form
        name="contact"
        method="post"
        action={action}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={handleChange} />
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="name" ><FormattedMessage id="contact.name"/></label>
          <div className="control">
            <input className="input" type="text" name="name" onChange={handleChange} id="name" required={true} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="surname" ><FormattedMessage id="contact.surname"/></label>
          <div className="control">
            <input className="input" type="text" name="surname" onChange={handleChange} id="surname" required={true} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="email"><FormattedMessage id="contact.email"/></label>
            <div className="control">
              <input className="input" type="email" name="email" onChange={handleChange} id="email" required={true} />
            </div>
          </div>
          <div className="field">
           <label className="label" htmlFor="subject"><FormattedMessage id="contact.subject"/></label>
             <div className="control">
               <input className="input" type="subject" name="subject" onChange={handleChange} id="subject" required={true} />
            </div>
        </div>
        <div className="field">
          <div className="control">
          <label className="radio menu-names">
            <input
              type="radio"
              name="gender-male"
              value="male"
              onChange={handleChange}
              defaultChecked
            />
            <span><FormattedMessage id="contact.gender.male"/></span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="gender-female"
              value="female"
              onChange={handleChange}
            />
            <span><FormattedMessage id="contact.gender.female"/></span>
          </label>
        </div>
        </div>
        <div className="field">
        <label className="label">
        <p className="content has-text-weight-semibold"><FormattedMessage id='contact.enquiry'/></p>
            <div className="select">
            <select
              className="content"
              name="type-enquiry"
              defaultValue="Type of Enquiry"
              onChange={handleChange}
              required
            >
              <option name="options" disabled hidden>
                Choose
              </option>
              <FormattedMessage id='contact.enquiry.a' key={'op' + '-' + 'a'}>
                {(message) => <option value='a'>{message}</option>}
              </FormattedMessage>
              <FormattedMessage id='contact.enquiry.b' key={'op' + '-' + 'b'}>
                {(message) => <option value='b'>{message}</option>}
              </FormattedMessage>
              <FormattedMessage id='contact.enquiry.c' key={'op' + '-' + 'c'}>
                {(message) => <option value='c'>{message}</option>}
              </FormattedMessage>
            </select>
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="message"><FormattedMessage id="contact.message"/></label>
          <div className="control">
            <textarea className="textarea" name="message" onChange={handleChange} id="message" required={true} />
          </div>
        </div>
        <div className="field">
        <div className="control">
          <button className="button is-link" type="submit"><FormattedMessage id="contact.send"/></button>
        </div>
        </div>
      </form>
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
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/?no-cache=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };
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
    const imageSEO = frontmatter.image.childImageSharp.gatsbyImageData.src;
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
                onSubmit={this.handleSubmit}
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

export const pageQuery = graphql`query ContactPageQuery($id: String!) {
  site {
    siteMetadata {
      languages {
        defaultLangKey
        langs
      }
    }
  }
  allArticlesJson(filter: {title: {eq: "home"}}) {
    edges {
      node {
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
          gatsbyImageData(quality: 100, layout: FULL_WIDTH)
        }
      }
      address
      phone
      email
      locations {
        lat
        lng
        message
      }
      linkinsta
      instagram
      imageCardSL {
        alt
        image {
          childImageSharp {
            gatsbyImageData(width: 128, quality: 80, layout: CONSTRAINED)
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
