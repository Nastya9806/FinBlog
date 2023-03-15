import React from 'react'
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Spin = () => {

    return(
        <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
  <CircularProgress sx={{margin: '50px auto'}} />
</Box>
    )
}

export default Spin