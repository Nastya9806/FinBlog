import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Paper, Grid } from '@mui/material';

import { fetchArticle } from '../services/kata'
import ArticleCard from '../components/article-card/article-card'

const SingleArticle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { token } = useSelector((state) => state.user.user)
  const article = useSelector((state) => state.articles.article);
  useEffect(() => {
    dispatch(fetchArticle(slug, token));
  }, [dispatch, slug]);

  return (
        <>
          <Paper sx={{ pb: 2, mb: 2 }}>
            <ArticleCard post={article} singlePage />
            <Box sx={{ p: 2 }}>
              <Typography component="span">
                <ReactMarkdown>{article.text}</ReactMarkdown>
              </Typography>
            </Box>
          </Paper>
        </>

  );
};

export default SingleArticle;