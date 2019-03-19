import React from 'react'
import { Link } from 'gatsby'
import select from '../components/utils'
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'

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
            style={{ width: '14em', height: '10em' }}
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
                    <span className="fa-stack fa-lg">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                  <a title="twitter" href="https://twitter.com">
                    <span className="fa-stack fa-lg">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                  <a title="instagram" href="https://instagram.com">
                    <span className="fa-stack fa-lg">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                  <a title="vimeo" href="https://vimeo.com">
                    <span className="fa-stack fa-lg">
                     <i className="fa fa-circle fa-stack-2x"></i>
                     <i className="fa fa-vimeo fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
        </div>
      </footer>
    )
  }
}

export default Footer
