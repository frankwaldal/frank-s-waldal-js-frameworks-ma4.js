import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
} from '@material-ui/core';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import PropTypes from 'prop-types';
import React from 'react';

import StringToList from '../commonComponents/StringToList';

const cardOverrides = makeStyles({
  card: { marginBottom: '1rem' },
  media: { backgroundSize: 'auto', height: '80px', width: '80px', margin: '10px' },
})

export default function RecipeItem({ img, ingredients, title, url }) {
  const classes = cardOverrides();
  return (
    <Card className={classes.card} raised>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe'>{title.slice(0,1).toUpperCase()}</Avatar>
        }
        title={title}
        />
      <Grid container spacing={2}>
        {img !== '' ? (
          <Grid item sm={3}>
            <CardMedia image={img} title={title} className={classes.media} />
          </Grid>
        ) : null}
        <Grid item sm={7}>
          <StringToList content={ingredients} title={title}/>
        </Grid>
      </Grid>
      <Button href={url} color='secondary' endIcon={<ChevronRightOutlinedIcon />} fullWidth>More information</Button>
    </Card>
  )
}

RecipeItem.propTypes = {
  img: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
