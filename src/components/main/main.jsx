import React from 'react';
import { Container } from '@mui/material';

import classes from './main.module.scss';
import ArticleList from '../list-article/list-article';

const Main = () => {
  return (
    <Container className={classes.main} sx={{ mt: '80px' }}>
      <ArticleList />
    </Container>
  );
};

export default Main;