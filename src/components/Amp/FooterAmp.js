import React from 'react'
import { Link } from 'gatsby'
import select from '../../components/utils'
import { FormattedMessage } from 'react-intl';
import menuTree from '../../data/menuTree'
import { FaFacebook, FaTwitter, FaInstagram, FaVimeo, FaLinkedin } from 'react-icons/fa';
import Copyright from '../../components/Copyright'
import ScrollToTop from '../../components/ScrollToTop'
import logo from '../../img/logo-amp.png'

const FooterAmp = class extends React.Component {
  render() {
    const props = this.props;
    const sel = select(props.langKey);
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered" style={{ maxWidth: '600px'}}>
          <amp-img
            layout="responsive"
            width="600"
            height="60"
            src={logo}
            alt="Kaki"
            style={{ marginLeft: '1em' }}
          />
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
                <div className="social">
                  <a title="facebook" href="https://facebook.com">
                     <FaFacebook className="facebook-icon"  size="2em"/>
                  </a>
                  <a title="twitter" href="https://twitter.com">
                    <FaTwitter className="twitter-icon"  size="2em"/>
                  </a>
                  <a title="instagram" href="https://instagram.com">
                    <FaInstagram className="instagram-icon" size="2em"/>
                  </a>
                  <a title="vimeo" href="https://vimeo.com">
                    <FaVimeo className="vimeo-icon"  size="2em"/>
                  </a>
                  <a title="linkedin" href="https://linkedin.com">
                    <FaLinkedin className="linkedin-icon"  size="2em"/>
                  </a>
                </div>
            </div>
            <Copyright />
        </div>
        <ScrollToTop/>
      </footer>
    )
  }
}

export default FooterAmp
