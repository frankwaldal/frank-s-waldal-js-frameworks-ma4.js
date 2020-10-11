import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function SearchRecipe({ handleSearch }) {
  return (
    <Grid container alignItems='center' direction='column'>
      <TextField
        label='Filter recipes'
        helperText='Filter by title or ingredients'
        margin='normal'
        onChange={handleSearch}
        />
    </Grid>
  )
}

SearchRecipe.propTypes = {
  handleSearch: PropTypes.func.isRequired
}
