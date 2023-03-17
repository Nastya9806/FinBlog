import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'

import { registerUser } from '../../services/userState'
import { setDone } from '../../redux/slices/user'

const SignForm = ({ token }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Поле "Email" должно быть заполнено').email('Email не верный'),
    password: Yup.string()
      .min(6, 'Поле "Password" не должно содержать менее 6 символов')
      .required('Поле "Password" должно быть заполнено'),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  })

  const dispatch = useDispatch()
  const servErr = useSelector((state) => state.user.errors)

  const onSubmit = (data) => {
    dispatch(registerUser(data, true))
    dispatch(setDone)
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      navigate('/articles')
    }
  }, [token])

  return (
    <>
      <Box
        sx={{
          m: 'auto',
          mt: 10,
          maxWidth: 384,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper sx={{ p: 5 }}>
            <Typography
              variant="h6"
              justify="center"
              align="center"
              sx={{
                mb: 1,
              }}
            >
              Sign In
            </Typography>

            <Typography>Email address</Typography>

            <TextField
              id="email"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 1,
              }}
              {...register('email')}
              error={!!errors?.email}
              message="чет не так"
              helperText={errors?.email?.message}
              onKeyUp={() => {
                setValue('email', watch('email').toLowerCase())
              }}
            />
            {servErr ? (
              <Typography sx={{ color: 'red', fontSize: '12px', p: '0px' }}>{`${Object.keys(servErr)} ${Object.values(
                servErr
              )}`}</Typography>
            ) : null}

            <Typography>Password</Typography>
            <TextField
              type="password"
              id="password"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 3,
              }}
              {...register('password')}
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mb: 2,
              }}
            >
              Login
            </Button>
            <Typography variant="body2" justify="center" align="center">
              Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
            </Typography>
          </Paper>
        </form>
      </Box>
    </>
  )
}

export default SignForm
