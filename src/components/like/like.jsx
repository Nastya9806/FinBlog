import React, {useState} from 'react'
import { setLike, fetchArticle, fetchArticles } from '../../services/kata'
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from '@mui/material'
import { FavoriteBorder, Favorite} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


function Like({user, token, post}) {

    const [favoriteCount, setFavoriteCount] = useState(post.favoritesCount);
    const dispatch = useDispatch()
    const { location } = useSelector((state) => state.status)
    const { page, limit } = useSelector((state) => state.articles)

   const isChecked = localStorage.getItem(`${post.slug}`) ? true : false

      const onLike = (e) => {
          if(e.target){
        if (token) {
          setFavoriteCount(favoriteCount + 1);
          dispatch(setLike(token, post.slug, post.liked))
          localStorage.setItem(`${post.slug}`, `${post.slug}`)
          location === 'article-page'
            ? dispatch(fetchArticle(post.slug, token))
            : dispatch(fetchArticles(page, limit, token))
        }
    } 
      }

    return(
        <Box>
        <Checkbox 
        icon={<FavoriteBorder />} 
        disabled={!user}
        checked={isChecked} 
        checkedIcon={<Favorite sx={{ color: 'red' }} />} 
        onChange={(e) => onLike(e)} />
      </Box>
    )
}

export default Like