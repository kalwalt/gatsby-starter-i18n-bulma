import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import { FaTag } from 'react-icons/fa'

const TagList = ({tags, langKey}) => {
  return (
    <div className="newtag content">
    {tags && tags.length ? (
      <div style={{ marginTop: `4rem` }}>
        <h4 className="subtitle">Tags</h4>
        <ul className="taglist">
          {tags.map(tag => (
            <li key={tag + `tag`}>
              <span className="tag is-light is-small">
                <Link to={`/${langKey}/tags/${kebabCase(tag)}/`}><FaTag className="menu-names"/>{tag}</Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
    </div>
  )
}

TagList.propTypes = {
  tags: PropTypes.array,
};

export default TagList;
