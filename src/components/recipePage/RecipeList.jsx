import { Container, Grid, LinearProgress, Typography } from '@material-ui/core';
import sortBy from 'lodash/sortBy';
import React, { useEffect, useState } from 'react';

import { API_PROXY, API_URL } from '../../constants/constants';
import RecipeItem from './RecipeItem';
import SearchRecipe from './SearchRecipe';

export default function RecipeList() {
  const [completeList, setCompleteList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_PROXY+API_URL)
      .then(resolve => {
        resolve.json().then(data => {
          const sortedList = sortBy(data.results, 'title');
          setCompleteList(sortedList);
          setFilteredList(sortedList);
          setIsLoading(false);
        })
      })
  }, []);

  function handleSearch(e) {
    const filteredRecipes = completeList.filter(recipe => {
      return recipe.title.toLowerCase().includes(e.target.value.toLowerCase()) || recipe.ingredients.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredList(filteredRecipes);
  }

  return (
    <Container>
      <Typography variant='h2' align='center' gutterBottom>Recipes</Typography>
      <SearchRecipe handleSearch={handleSearch}/>
      {isLoading ? (
        <LinearProgress variant='query'/>
      ) : (
        <Grid container spacing={3}>
          {filteredList.map(recipe => (
            <Grid item key={recipe.title+recipe.ingredients} sm={4}>
              <RecipeItem
                img={recipe.thumbnail}
                ingredients={recipe.ingredients}
                title={recipe.title}
                url={recipe.href}
                />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
