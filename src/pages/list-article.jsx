import React, {useEffect} from 'react';
import { List } from '@mui/material';
import ArticleCard from '../components/article-card/article-card'
import {useDispatch, useSelector} from 'react-redux';
import {fetchArticles} from '../services/kata'
import { v4 as uuidv4 } from 'uuid'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {setPage, setLoading, resetArticles} from '../redux/articles'
import {setStatus, setLocation, goHome} from '../redux/status'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ArticleList = () => {
  const dispatch = useDispatch();
  const {articles, currPage, limit, articlesCount, loading} = useSelector(state => state.articles);
  const status = useSelector((state) => state.status.status)
  const handleChangePage = (pageNumber) => {
    dispatch(setPage(pageNumber))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    // dispatch(goHome(false))
    dispatch(setLocation('articles-list'))
    dispatch(setStatus('loading'))
    dispatch(fetchArticles(currPage, limit))
  }, [dispatch, currPage]);

  const posts = articles.map((post) => {
    return <ArticleCard key={uuidv4()} post={post} />
   })

  const spin = <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
  <CircularProgress sx={{margin: '50px auto'}} />
</Box>

const isLoading = (load) => {
  if(load === 'loading'){
    return spin
  } else{
    return posts
  }
}

const showContent = isLoading(status)

  return ( 
    <>
      <List spacing={2}>
        {showContent}
      </List>
      <Stack spacing={2}>
       <Pagination sx={{ margin: '10px auto', flex: '0 0 auto' }} page={currPage} count={Math.ceil(articlesCount / 5)} onChange={(_, num) => {handleChangePage(num)}} color="primary" />
     </Stack>
  </>
  );
};

export default ArticleList;