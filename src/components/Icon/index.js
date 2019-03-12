import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import React from 'react'

import {
  faApple,
  faAws,
  faFacebook,
  faInstagram,
  faVimeo,
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
  faCircle,
} from '@fortawesome/free-solid-svg-icons'

import './style.scss'

library.add(
  faApple,
  faAws,
  faFacebook,
  faInstagram,
  faVimeo,
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
  faAmericanSignLanguageInterpreting,
  faCircle

)


const Icon = ({ name, classN }) => (
  <div className={classN + " icon"} title={name}>
    <FontAwesomeIcon icon={['fa', name]} />
  </div>
)

const IconB = ({ name, classN }) => (
  <div className={classN + " icon"} title={name}>
    <FontAwesomeIcon icon={['fab', name]} />
  </div>
)

export { Icon, IconB }
