import { Container, Grid, LinearProgress, Typography } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import sortBy from 'lodash/sortBy';
import React, { useEffect, useState } from 'react';

import { API_PROXY, API_URL } from '../../constants/constants';
import RecipeItem from './RecipeItem';
import SearchRecipe from './SearchRecipe';

export default function RecipeList() {
  const [completeList, setCompleteList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(API_PROXY+API_URL)
      .then(resolve => {
        resolve.json().then(data => {
          const sortedList = sortBy(data.results, 'title');
          setCompleteList(sortedList);
          setFilteredList(sortedList);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setError(true);
        })
      })
  }, []);

  function pagination(e) {
    const label = e.currentTarget.getAttribute('aria-label');
    let newPage = page;
    if (label === 'Go to next page') {
      newPage += 1;
      setPage(newPage);
    } else if (label === 'Go to previous page') {
      newPage -= 1;
      setPage(newPage);
    } else if (label === 'Go to last page') {
      newPage = 100;
      setPage(newPage);
    } else if (label === 'Go to first page') {
      newPage = 1;
      setPage(newPage);
    } else {
      newPage = Number(label.slice(-1));
      setPage(Number(label.slice(-1)));
    }
    setIsLoading(true);
    fetch(API_PROXY+API_URL+'?p='+newPage)
      .then(resolve => {
        resolve.json().then(data => {
          const sortedList = sortBy(data.results, 'title');
          setCompleteList(sortedList);
          setFilteredList(sortedList);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setError(true);
        })
      })
  }

  function handleSearch(e) {
    const filteredRecipes = completeList.filter(recipe => {
      return recipe.title.toLowerCase().includes(e.target.value.toLowerCase()) || recipe.ingredients.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredList(filteredRecipes);
  }

  return (
    <Container>
      <Typography variant='h2' align='center' gutterBottom>Recipes</Typography>
      {isLoading ? (
        <LinearProgress variant='query'/>
      ) : error ? (
        <Alert severity='error'>Something went wrong, please try again.</Alert>
      ) : (
        <>
        <SearchRecipe handleSearch={handleSearch}/>
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
        <Grid container alignItems='center' direction='column'>
          <Pagination count={100} page={page} onChange={pagination} showFirstButton showLastButton />
        </Grid>
        </>
      )}
    </Container>
  )
}
