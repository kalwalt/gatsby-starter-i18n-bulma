import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import { navigate } from "gatsby-link";
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
import { getCurrentLangKey } from 'ptz-i18n';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function setActionPath(langKey) {
  let path;
  if(langKey=='en'){
    path = '/en/contact/thanks/';
  }else{
    path = '/it/contatto/grazie/';
  }
  return path;
}

const ContactPageTemplate = ({ title, content, contentComponent, handleSubmit, handleChange, nameLabel, action }) => {
  const PageContent = contentComponent || Content
  return (
      <section className="section">
        <div className="container">
          <div className="content">
      <h1 className="title">{title}</h1>
      <PageContent className="container content" content={content} />
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
          <label className="label" htmlFor={"name"} >{nameLabel}</label>
          <div className="control">
            <input className="input" type={"text"} name={"name"} onChange={handleChange} id={"name"} required={true} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor={"email"}>Email</label>
            <div className="control">
              <input className="input" type={"email"} name={"email"} onChange={handleChange} id={"email"} required={true} />
            </div>
          </div>
          <div className="field">
           <label className="label" htmlFor={"subject"}>Subject</label>
             <div className="control">
               <input className="input" type={"subject"} name={"subject"} onChange={handleChange} id={"subject"} required={true} />
            </div>
        </div>
        <div className="field">
          <div className="control">
          <label className="radio menu-names">
            <input
              type="radio"
              name="gender"
              value="male"
              defaultChecked
            />
            <span>Male</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="gender"
              value="female"
            />
            <span>Female</span>
          </label>
        </div>
        </div>
        <div className="field">
        <label className="label">
            <div className="select">
            <select
              className="content has-text-weight-semibold"
              name="type"
              defaultValue="Type of Enquiry"
              required
            >
              <option disabled hidden>
                Type of Enquiry
              </option>
              <option>Need to know more</option>
              <option>About art</option>
              <option>Want to say hello</option>
            </select>
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor={"message"}>Message</label>
          <div className="control">
            <textarea className="textarea" name={"message"} onChange={handleChange} id={"message"} required={true} />
          </div>
        </div>
        <div className="field">
          <button className="button is-link" type="submit">Send</button>
        </div>
      </form>
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
    fetch("/", {
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
    return (
      <Layout className="container" data={data} jsonData={jsonData} location={location}>
        <div>
            <ContactPageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            onSubmit={this.handleSubmit}
            nameLabel={dataMarkdown.frontmatter.nameLabel}
            action={action}
             />
        </div>
      </Layout>
    )
  }
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage;

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
        nameLabel
      }
      fields {
        slug
      }
    }
  }
`
