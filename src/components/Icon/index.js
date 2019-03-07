import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import React from 'react'

import {
  faApple,
  faAws,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons'

import {
  faHome,
  faImage,
  faHandPointer,
  faIdCard,
  faPenAlt,
  faQuestion,
  faAmericanSignLanguageInterpreting,
} from '@fortawesome/free-solid-svg-icons'

import './style.scss'

library.add(
  faApple,
  faAws,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs,
  faHome,
  faImage,
  faHandPointer,
  faIdCard,
  faPenAlt,
  faQuestion,
  faAmericanSignLanguageInterpreting
)


const Icon = ({ name }) => (
  <div className="icon" title={name}>
    <FontAwesomeIcon icon={['fa', name]} />
  </div>
)

const IconB = ({ name }) => (
  <div className="icon" title={name}>
    <FontAwesomeIcon icon={['fab', name]} />
  </div>
)

export { Icon, IconB }
