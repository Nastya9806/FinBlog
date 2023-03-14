import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid'
import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createArticle, editArticle } from '../services/kata'
import { setErrors } from '../redux/user'
import { createTags } from '../redux/tags'
import { setSubmit } from '../redux/status'
import { useParams, useNavigate } from 'react-router-dom';
// import uniqKey from '../utilites/uniqKey';
import { addTag, deleteTag, editTag } from '../redux/tags'
import Tag from '../components/tags/tags'
 

const ArticleForm = () => {
    const { slug } = useParams()

    const { articles } = useSelector((state) => state.articles)
    const article = articles.find((item) => item.slug === slug)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Поле "Title" должно быть заполнено'),
    description: Yup.string().required('Поле "Short description" должно быть заполнено'),
    text: Yup.string().required('Поле "Text" должно быть заполнено'),
  });
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
  });

const dispatch = useDispatch()
const navigate = useNavigate()



   
  const { tags } = useSelector((state) => state.tags)
  const { token, username } = useSelector((state) => state.user.user)
  const { home, goTo } = useSelector((state) => state.status)

  const tagList = tags.map((tag, idx) => (
  <Tag key={uuidv4()} idx={idx} id={tag.id} value={tag.label} tagsLength={tags.length} />
  ))
const sendTags = tags.map((tag) => tag.label).filter((tag) => tag !== '')

const onSubmit = (data) => {
  dispatch(setSubmit(false))
  console.log(data)
  slug ? dispatch(editArticle(data, sendTags, token, slug)) : dispatch(editArticle(data, sendTags, token))
}

  const memToken = useMemo(() => token, [])

  useEffect(() => {
    if (goTo) navigate(`/articles/${goTo}`)
  }, [goTo])

  useEffect(() => {
    if (slug && article?.username !== username) navigate('/')
    if (!memToken) navigate('/')
    if (home) navigate('/')
    dispatch(setErrors(null))
  }, [home, dispatch, navigate, memToken, slug])


  useEffect(() => {
    if (slug && article && Object.keys(article).length > 0) {
      const newTags = []
      article.tags.forEach((tag) => {
        newTags.push({
          id: uuidv4(),
          label: tag, 
        })
      })
      dispatch(createTags(newTags))
    } else {
      dispatch(createTags([{ id: uuidv4(), label: '' }]))
    }
  }, [dispatch, slug, article])


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
          {tagList}
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
  );
};

export default ArticleForm;