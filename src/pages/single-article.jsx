import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Paper, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ArticleCard from '../components/article-card/article-card'

const SingleArticle = () => {
const { slug } = useParams();
const {loading} = useSelector((state) => state.articles);
const {articles} = useSelector((state) => state.articles);
const article = articles.find((item) => item.slug === slug)


  const isLoading = (load) => {
    if(load !== 'done' && !article){
      return spin
    }
    else{
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

  const spin = <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
  <CircularProgress sx={{margin: '50px auto'}} />
</Box>


  const showContent = isLoading(loading)

  return (
        <>
        {showContent}
        </>

  );
};

export default SingleArticle;