import React from 'react'
import { Link } from 'gatsby'
import select from '../components/utils'
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'
import { FaFacebook, FaTwitter, FaInstagram, FaVimeo, FaLinkedin } from 'react-icons/fa';
import Copyright from '../components/Copyright'
import ScrollToTop from '../components/ScrollToTop'
import logo from '../img/logo.svg'

const Footer = class extends React.Component {
  render() {
    const props = this.props;
    const sel = select(props.langKey);
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="Kaldi"
            style={{ width: '14em', height: '5em' }}
          />
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
              <div className="columns">
                <div className="column is-4">
                <section className="menu">
                    <ul className="menu-list">
                      <li><Link to={"/" + props.langKey} className="navbar-item"><FormattedMessage id="home" /></Link></li>
                      <li><Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.about[sel] +"/"}><FormattedMessage id="about" /></Link></li>
                      <li><Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.artworks[sel] +"/"}>
                        <FormattedMessage id="artworks" />
                      </Link>
                    </li>
                    <li><a
                      className="navbar-item"
                      href="/admin/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Admin
                    </a></li>
                    </ul>
                  </section>
                </div>
                <div className="column is-4">
                <section>
                  <ul className="menu-list">
                  <li>
                    <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.blog[sel] +"/"}>
                      <FormattedMessage id="blog" />
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to={"/" + props.langKey + "/" + menuTree.contact[sel] +"/"}>
                      <FormattedMessage id="contact" />
                    </Link>
                  </li>
                  </ul>
                </section>
                </div>
                <div className="column is-4 social">
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
            </div>
            <Copyright />
        </div>
        <ScrollToTop/>
      </footer>
    )
  }
}

export default Footer
