import { List, ListItem, ListItemText } from '@material-ui/core';
import capitalize from 'lodash/capitalize';
import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';
import React from 'react';

export default function StringToList({ content, title }) {
  const uniqSlicedStrings = uniq(content.split(', '));
  return (
    <List>
      {uniqSlicedStrings.map(item => (
        <ListItem key={title+item}>
          <ListItemText primary={capitalize(item)} />
        </ListItem>
      ))}
    </List>
  )
}

StringToList.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
