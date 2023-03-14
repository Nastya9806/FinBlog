import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/user'
import { getUser } from '../../services/userState'

const Header = () => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const avatar = user.image ? user.image : null
  const onLogOut = () => {
    localStorage.removeItem('user')
    dispatch(logOut())
  }

  useEffect(() => {
    if (user.token) {
      dispatch(getUser(user.token))
    }
  }, [])

  const authorized = <>
  <Link style={{ textDecoration: 'none' }} to="/new-article">
    <Button color="success" variant="outlined" sx={{ textTransform: 'none' }}>
      Create article
    </Button>
  </Link>
  <Link to="/profile" style={{ textDecoration: 'none' }}>
    <Typography variant="h6" color="black">
      {user.username}
    </Typography>
  </Link>
  <Link to="/profile" style={{ textDecoration: 'none' }}>
    <Avatar alt="Avatar" src={avatar} sx={{ width: 46, height: 46 }} />
  </Link>
  <Link to="/" style={{ textDecoration: 'none' }}>
  <Button color="inherit" variant="outlined" sx={{ textTransform: 'none' }} onClick={onLogOut}>
    Log Out
  </Button>
  </Link>
</>

const base = <>
<Link to="/sign-in" style={{ textDecoration: 'none' }}>
        <Button color="inherit" sx={{ textTransform: 'none', mr: 3, fontSize: '1.2rem' }}>
          Sign In
        </Button>
        </Link>
        <Link to="/sign-up" style={{ textDecoration: 'none' }}>
        <Button color="success" variant="outlined" sx={{ textTransform: 'none', fontSize: '1.2rem' }}>
          Sign Up
        </Button>
        </Link>
</>

  return (
    <AppBar position="fixed" color="inherit" sx={{ boxShadow: 'unset' }}>
      <Toolbar style={{display: 'flex', gap: '10px'}}>
      <Link style={{ textDecoration: 'none', flexGrow: 1 }} to="/articles">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Realworld Blog
        </Typography>
        </Link>
        {user.token ? authorized : base}
      </Toolbar>
    </AppBar>
  );
};

export default Header;