import React, { useEffect } from 'react'
import { List } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import ArticleCard from '../components/article-card'
import { fetchArticles } from '../services/kata'
import { setPage, setLoading } from '../redux/slices/articles'
import Spin from '../UI/spin'

const ArticleList = () => {
  const dispatch = useDispatch()
  const { articles, currPage, limit, articlesCount, loadingData, change } = useSelector((state) => state.articles)

  const handleChangePage = (pageNumber) => {
    dispatch(setPage(pageNumber))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setLoading('loading'))
    dispatch(fetchArticles(currPage, limit))
  }, [dispatch, currPage])

  useEffect(() => {
    dispatch(setLoading('loading'))
    dispatch(fetchArticles(currPage, limit))
  }, [change, dispatch])

  return (
    <>
      {loadingData === 'loading' && <Spin />}
      {loadingData === 'done' && (
        <>
          <List spacing={2}>
            {articles.map((post) => {
              return <ArticleCard key={uuidv4()} post={post} />
            })}
          </List>
          <Stack spacing={2}>
            <Pagination
              sx={{ margin: '10px auto', flex: '0 0 auto' }}
              page={currPage}
              count={Math.ceil(articlesCount / 5)}
              onChange={(_, num) => {
                handleChangePage(num)
              }}
              color="primary"
            />
          </Stack>
        </>
      )}
    </>
  )
}

export default ArticleList
