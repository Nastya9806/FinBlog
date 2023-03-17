import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams, useNavigate } from 'react-router-dom'

import { editArticle } from '../services/kata'
import { setChange } from '../redux/slices/articles'
const ArticleForm = () => {
  const { slug } = useParams()
  const { articles } = useSelector((state) => state.articles)
  const article = articles.find((item) => item.slug === slug)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Поле "Title" должно быть заполнено'),
    description: Yup.string().required('Поле "Short description" должно быть заполнено'),
    text: Yup.string().required('Поле "Text" должно быть заполнено'),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      text: article?.text || '',
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [tagList, setTagList] = useState(article?.tagList || [])
  const [tagValue, setTagValue] = useState('')

  const { token } = useSelector((state) => state.user.user)

  const onSubmit = (data) => {
    slug ? dispatch(editArticle(data, tagList, token, slug)) : dispatch(editArticle(data, tagList, token))
    dispatch(setChange('list changed'))
    navigate('/articles')
  }

  const onAdd = () => {
    setTagList([...tagList, tagValue])
    setTagValue('')
  }

  const onDelete = (id) => {
    setTagList(tagList.filter((_, index) => index !== id))
  }

  return (
    <Container
      sx={{
        m: 'auto',
        maxWidth: '1440px',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            p: 5,
          }}
        >
          <Typography
            variant="h6"
            justify="center"
            align="center"
            sx={{
              mb: 1,
            }}
          >
            {slug ? 'Edit article' : 'Create new article'}
          </Typography>

          <TextField
            id="title"
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            defaultValue={slug && article && article.text}
            required
            sx={{
              mb: 1,
            }}
            {...register('title')}
            error={!!errors?.title}
            helperText={errors?.title?.message}
          />

          <TextField
            id="description"
            label="Short description"
            variant="outlined"
            size="small"
            fullWidth
            required
            sx={{
              mb: 1,
            }}
            {...register('description')}
            error={!!errors?.description}
            helperText={errors?.description?.message}
          />

          <TextField
            id="text"
            label="Text"
            variant="outlined"
            minRows={6}
            multiline
            fullWidth
            required
            sx={{
              mb: 1,
            }}
            {...register('text')}
            error={!!errors?.text}
            helperText={errors?.text?.message}
          />
          <Typography>Tags</Typography>
          <Box>
            {tagList &&
              tagList.map((item, id) => {
                return (
                  <Box key={uuidv4()} sx={{ mb: 2 }}>
                    <TextField disabled id={item} value={item} size="small" sx={{ mr: 2 }} />
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{
                        textTransform: 'none',
                      }}
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </Button>
                  </Box>
                )
              })}
            <TextField
              id="tag"
              value={tagValue}
              variant="outlined"
              size="small"
              sx={{
                mr: 1,
              }}
              onChange={(event) => {
                setTagValue(event.target.value)
              }}
            />

            <Button
              variant="outlined"
              sx={{
                mb: 2,
                textTransform: 'none',
              }}
              onClick={onAdd}
            >
              Add Tag
            </Button>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mb: 2,
              textTransform: 'none',
              width: '50%',
            }}
          >
            Send
          </Button>
        </Paper>
      </form>
    </Container>
  )
}

export default ArticleForm
