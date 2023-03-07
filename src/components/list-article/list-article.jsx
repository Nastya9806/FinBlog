import React, {useEffect} from 'react';
import { List } from '@mui/material';
import ArticleCard from '../article-card/article-card'
import {useDispatch, useSelector} from 'react-redux';
import {fetchArticles} from '../../services/kata'

const ArticleList = () => {
  const dispatch = useDispatch();
  const {articles, articlesCount, page, limit} = useSelector(state => state.articles);
  // const status = useSelector(state => state.status.status);

  useEffect(() => {
    // dispatch(setLocation('articles-list'));
    // dispatch(setStatus('loading'));
    dispatch(fetchArticles(page, limit));
  }, [page, limit, dispatch]);

  // const posts = articles.map((post) => {

  // })
  return (
      <List spacing={2}>
           <ArticleCard />
      </List>
  );
};

export default ArticleList;