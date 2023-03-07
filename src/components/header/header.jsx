// import React from 'react'
// import classes from './header.module.scss'

// function Header(){

//     return(
//         <div className={classes.header}>
//             <h3>Привет, педики</h3>
//             <button className={classes.btn}>Sign In</button>
//             <button className={classes.btn}>Sign Up</button>
//             </div>
//     )
// }

// export default Header

import React from 'react';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';


const Header = () => {
  return (
    <AppBar position="fixed" color="inherit" sx={{ boxShadow: 'unset' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Realworld Blog
        </Typography>
        <Button color="inherit" sx={{ textTransform: 'none', mr: 3, fontSize: '1.2rem' }}>
          Sign In
        </Button>
        <Button color="success" variant="outlined" sx={{ textTransform: 'none', fontSize: '1.2rem' }}>
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;