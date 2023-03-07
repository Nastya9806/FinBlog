import React from 'react'
import { Box, Checkbox, Grid, Typography, ListItem, ListItemText } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import classes from './article-card.module.scss'

function ArticleCard() {
    return ( 
      <ListItem sx={{height: '140px', cursor: 'pointer', backgroundColor: 'white', cursor: 'pointer' }}>
      <Grid container columnSpacing={2} sx={{height: '100%'}}>
        <Grid item xs={10}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Typography variant="h5" color="#1890FF" sx={{ mr: '5px' }}>
              Название статьи тут
            </Typography>
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            <Typography sx={{ mr: '5px' }}>12</Typography>
          </Grid>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  border: '1px solid grey',
                  borderRadius: '5px',
                  padding: '3px 7px',
                  mr: '5px',
                  mt: 1,
                }}
              >
                tags
              </Typography>
          <ListItemText align="justify" sx={{ mt: 1 }}>
            Описание статьи описание статьи описание статьи
          </ListItemText>
        </Grid>
        <Grid item xs={2}>
          <Grid container direction="row-reverse">
            <Box>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2" sx={{ color: '#808080' }}>
                Дата создания статьи{' '}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
    )
  }

export default ArticleCard