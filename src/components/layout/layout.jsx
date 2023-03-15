import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material';
import Header from '../header/header'
import { useSelector} from 'react-redux';
import ErrorDetected from '../../UI/error/error'

const Layout = () => {
  const {loadingData} = useSelector((state) => state.articles)
  const data = loadingData === 'error' ? <ErrorDetected /> : <Outlet />

  return(
  <>
    <Header />
    <Container sx={{ mt: '80px' }}>
{data}
    </Container>
  </>
  )
  };

export default Layout;