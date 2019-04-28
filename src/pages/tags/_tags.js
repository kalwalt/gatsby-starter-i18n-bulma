import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { FormattedMessage } from 'react-intl'
import Helmet from 'react-helmet'

const TagsPageRoute = (props) => {
  const allTags = props.data.allMarkdownRemark.group;

  return (
    <section className="post-list">
      <FormattedMessage id="tags">
        {(txt) => (
          <header>
            <Helmet
              title={txt}
              meta={[{ name: 'description', content: txt }]}
            />
            <h1>
              {txt}
            </h1>
          </header>
        )}
      </FormattedMessage>
      <nav>
        <ul>
          {allTags.map(tag =>
            <li key={tag.fieldValue}>
              <Link
                style={{
                  textDecoration: 'none',
                }}
                to={`${props.pageContext.langKey}/tags/${kebabCase(tag.fieldValue)}/`}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
};

TagsPageRoute.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
};

export default TagsPageRoute
