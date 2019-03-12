import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import { FaCircle, FaFacebook, FaTwitter, FaInstagram, FaVimeo } from 'react-icons/fa';
import { IconContext } from "react-icons";

const Footer = class extends React.Component {
  render() {
    const props = this.props;
    return (
      <IconContext.Provider value={{ className: 'react-icons' }}>
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="Kaldi"
            style={{ width: '14em', height: '10em' }}
          />
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
              <div className="columns">
                <div className="column is-4">
                <section className="menu">
                    <ul className="menu-list">
                      <li><Link to={props.langKey} className="navbar-item">Home</Link></li>
                      <li><Link className="navbar-item" to={props.langKey + "/about"}>About</Link></li>
                      <li><Link className="navbar-item" to={props.langKey + "/artworks"}>
                        Artworks
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
                    <Link className="navbar-item" to={props.langKey + "/blog"}>
                      Latest Stories
                    </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to={props.langKey + "/contact"}>
                      Contact
                    </Link>
                  </li>
                  </ul>
                </section>
                </div>
                <div className="column is-4 social">
                  <a title="facebook" href="https://facebook.com">
                  <span className="fa-stack fa-lg">
                    <FaCircle className="fa-stack-2x" />
                    <FaFacebook className="fa-stack-1x fa-inverse" />
                  </span>
                  </a>
                  <a title="twitter" href="https://twitter.com">
                  <span className="fa-stack fa-lg">
                    <FaCircle className="fa-stack-2x" />
                    <FaTwitter className="fa-stack-1x fa-inverse" />
                  </span>
                  </a>
                  <a title="instagram" href="https://instagram.com">
                  <span className="fa-stack fa-lg react-icons">
                    <FaCircle className="fa-stack-2x" />
                    <FaInstagram className="fa-stack-1x fa-inverse" />
                  </span>
                  </a>
                  <a title="vimeo" href="https://vimeo.com">
                  <span className="fa-stack fa-lg">
                    <FaCircle className="fa-stack-2x" />
                    <FaVimeo className="fa-stack-1x fa-inverse" />
                  </span>
                  </a>
                </div>
              </div>
            </div>
        </div>
      </footer>
      </IconContext.Provider>
    )
  }
}

export default Footer
