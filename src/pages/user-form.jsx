import React, {useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Checkbox, Divider, FormControlLabel, Paper, TextField, Typography } from '@mui/material';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser, updateUser } from '../services/userState'
import { setErrors } from '../redux/user'
import { setSubmit } from '../redux/status'

const UserForm = ({signUp}) => {

  const formTitle = signUp ? 'Create new account' : 'Edit Profile';
  const buttonLabel = signUp ? 'Create' : 'Save';

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Поле "Имя пользователя" должно быть заполнено')
      .min(3, 'Имя пользователя должно содержать не менее 3 символов')
      .max(20, 'Имя пользователя должно содержать более 20 символов'),
    email: Yup.string().required('Поле "Email" должно быть заполнено').email('Email не верный'),
    password: Yup.string()
      .min(6, 'Поле "Password" не должно содержать менее 6 символов')
      .required('Поле "Password" должно быть заполнено'),
    confirmPassword: Yup.string()
      .required('Поле "Confirm Password" должно быть заполнено')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    acceptPersonalInf: Yup.bool().oneOf([true], 'Предоставьте согласие на обработку персональных данных'),
    avatarUrl: Yup.string().url('Введите корректный URL'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });


  const dispatch = useDispatch();

  const onSubmit = (data) => {
    signUp ? dispatch(setSubmit(false)) &&
    dispatch(registerUser(data, false))
    : dispatch(updateUser(data))
  }

  const navigate = useNavigate();
  const home = useSelector((state) => state.status.home)
  useEffect(() => {
    dispatch(setErrors(null))
    if (home) navigate('/')
  }, [home, dispatch, navigate])

  const { submitActive } = useSelector((state) => state.status)

  return (
    <Box
      sx={{
        m: 'auto',
        mt: 10,
        maxWidth: 384,
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
            {formTitle}
          </Typography>

          <TextField
            id="username"
            label="User name"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('username')}
            error={!!errors?.username}
            helperText={errors?.username?.message}
          />

          <TextField
            id="email"
            type="email"
            variant="outlined"
            label="Email address"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('email')}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />

          <TextField
            id="password"
            label="password"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mb: 1,
            }}
            {...register('password')}
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />

          <TextField
            id="confirmPassword"
            label="Repeat password"
            type="password"
            size="small"
            fullWidth
            sx={{
              mb: 2,
            }}
            {...register('confirmPassword')}
            error={!!errors?.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />

          {!signUp && (
            <TextField
              id="avatarUrl"
              type="url"
              label="Avatar image (url)"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
              }}
              {...register('avatarUrl')}
              error={!!errors?.avatarUrl}
              helperText={errors?.avatarUrl?.message}
            />
           )}
          {signUp && (
            <>
              <Divider
                sx={{
                  mb: 1,
                }}
              />

              <FormControlLabel
                control={<Checkbox {...register('acceptPersonalInf')} />}
                label="I agree to the processing of my personal
information"
              />
              {!!errors?.acceptPersonalInf && (
                <Typography variant="caption" display="block" gutterBottom sx={{ color: 'red' }}>
                  {errors?.acceptPersonalInf?.message}
                </Typography>
              )}
            </>
            )} 

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              my: 2,
            }}
          >
            {buttonLabel}
          </Button>

          {signUp && (
            <Typography variant="body2" justify="center" align="center">
              Already have an account? <Link to="/sign-in">Sign In.</Link>
            </Typography>
            )}
        </Paper>
      </form>
    </Box>
  );
};

export default UserForm;