import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Paper, Grid } from '@mui/material';
import ArticleCard from '../components/article-card/article-card'
import Spin from '../UI/spin/spin'
import ErrorDetected from '../UI/error/error'

const SingleArticle = () => {
const { slug } = useParams();
const {loadingData} = useSelector((state) => state.articles);
const {articles} = useSelector((state) => state.articles);
const article = articles.find((item) => item.slug === slug)
 
  const isLoading = (load) => {
    if(load === 'loading'){
      return <Spin />
    }
    else if(!article){
    return <ErrorDetected />
    } else if(load === 'done'){
      return (
        <>
        <Paper sx={{ pb: 2, mb: 2 }}>
          <ArticleCard post={article} singlePage />
          <Box sx={{ p: 2, paddingRight: '20px' }}>
            <Typography component="span" sx={{wordWrap: 'break-word'}}>
              <ReactMarkdown>{article.text}</ReactMarkdown>
            </Typography>
          </Box>
        </Paper>
      </>
      )
    }
  }


  const showContent = isLoading(loadingData)

  return (
        <>
        {showContent}
        </>

  );
};

export default SingleArticle;