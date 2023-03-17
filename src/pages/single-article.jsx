import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Box, Typography, Paper } from '@mui/material'

import ArticleCard from '../components/article-card'
import Spin from '../UI/spin/spin'
import ErrorDetected from '../UI/error'
import { fetchArticle } from '../services/kata'

const SingleArticle = () => {
  const { slug } = useParams()
  const { token } = useSelector((state) => state.user.user)
  const { loadingData } = useSelector((state) => state.articles)
  const { articles } = useSelector((state) => state.articles)
  const article = articles.find((item) => item.slug === slug)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticle(slug, token))
  }, [dispatch, slug])

  const isLoading = (load) => {
    if (load === 'loading') {
      return <Spin />
    } else if (!article) {
      return <ErrorDetected />
    } else if (load === 'done') {
      return (
        <>
          <Paper sx={{ pb: 2, mb: 2 }}>
            <ArticleCard post={article} singlePage />
            <Box sx={{ p: 2, paddingRight: '20px' }}>
              <Typography component="span" sx={{ wordWrap: 'break-word' }}>
                <ReactMarkdown>{article.text}</ReactMarkdown>
              </Typography>
            </Box>
          </Paper>
        </>
      )
    }
  }

  const showContent = isLoading(loadingData)

  return <>{showContent}</>
}

export default SingleArticle
