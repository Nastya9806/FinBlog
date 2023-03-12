import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material';
import Header from '../header/header'

const Layout = () => (
  <>
    <Header />
    <Container sx={{ mt: '80px' }}>
      <Outlet />
    </Container>
  </>
);

export default Layout;