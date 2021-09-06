import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';

const Time = ({ date }) => {
  return (
    <time  className="section" dateTime={date}>
      <FormattedDate
        value={new Date(date)}
        month="long"
        day="numeric"
        year="numeric"
      />
    </time>
  );
};

Time.propTypes = {
  date: PropTypes.string.isRequired
};

export default Time;
