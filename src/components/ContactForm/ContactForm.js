import React, { useState } from 'react'
import { navigate } from "gatsby-link"
import { FormattedMessage } from 'react-intl'
import { useInput } from './hooks/useInput'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const ContactForm = ({ action}) => {
  //const { value:botField, bind:bindBotfield, reset:resetBotfield } = useInput('');
  const { value:name, bind:bindFirstName, reset:resetFirstName } = useInput('');
  const { value:surname, bind:bindLastName, reset:resetLastName } = useInput('');
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:subject, bind:bindSubject, reset:resetSubject } = useInput('');
  const { value:genderMale, bind:bindGenderMale, reset:resetGenderMale } = useInput('');
  const { value:genderFemale, bind:bindGenderFemale, reset:resetGenderFemale } = useInput('');
  const { value:enquiry, bind:bindEnquiry, reset:resetEnquiry } = useInput('');
  const { value:message, bind:bindMessage, reset:resetMessage } = useInput('');

  const [isValidated, handleChange] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    //resetBotfield();
    resetFirstName();
    resetLastName();
    resetEmail();
    resetSubject();
    resetEnquiry();
    resetGenderMale();
    resetGenderFemale();
    resetMessage();
    const form = e.target;
    fetch("/?no-cache=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        isValidated
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
  }
  return (
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
        <input name="bot-field"/>
      </label>
    </div>
    <div className="field">
      <label className="label" htmlFor="name" ><FormattedMessage id="contact.firstName"/></label>
      <div className="control">
        <input className="input" type="text" name="name" {...bindFirstName} id="name" required={true} />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="surname" ><FormattedMessage id="contact.lastName"/></label>
      <div className="control">
        <input className="input" type="text" name="surname" {...bindLastName} id="surname" required={true} />
      </div>
    </div>
    <div className="field">
      <label className="label" htmlFor="email"><FormattedMessage id="contact.email"/></label>
        <div className="control">
          <input className="input" type="email" name="email" {...bindEmail} id="email" required={true} />
        </div>
      </div>
      <div className="field">
       <label className="label" htmlFor="subject"><FormattedMessage id="contact.subject"/></label>
         <div className="control">
           <input className="input" type="subject" name="subject" {...bindSubject} id="subject" required={true} />
        </div>
    </div>
    <div className="field">
      <div className="control">
      <label className="radio menu-names">
        <input
          type="radio"
          name="genderMale"
          value="male"
          {...bindGenderMale}
          defaultChecked
        />
        <span><FormattedMessage id="contact.gender.male"/></span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="genderFemale"
          value="female"
          {...bindGenderFemale}
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
          name="enquiry"
          defaultValue="Type of Enquiry"
          {...bindEnquiry}
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
        <textarea className="textarea" name="message" {...bindMessage} id="message" required={true} />
      </div>
    </div>
    <div className="field">
    <div className="control">
      <button className="button is-link" type="submit"><FormattedMessage id="contact.send"/></button>
    </div>
    </div>
  </form>
)
}

export default ContactForm
