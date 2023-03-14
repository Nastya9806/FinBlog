import React, {useState} from 'react'
import { setLike } from '../../services/kata'
import { useDispatch } from 'react-redux';
import { Checkbox } from '@mui/material'
import { FavoriteBorder, Favorite} from '@mui/icons-material';
import Box from '@mui/material/Box';


function Like({ token, post }) {
    const [favoriteCount, setFavoriteCount] = useState(post.favoritesCount);
    const dispatch = useDispatch()
    const isCheckedStorage = localStorage.getItem(`${post.slug}`) && token ? true : false

    const onLike = () => {
        if (post.slug) {
          setFavoriteCount(favoriteCount + 1);
          dispatch(setLike(token, post.slug, post.liked))
          localStorage.setItem(`${post.slug}`, `${post.slug}`)
    } 
      }
  
    return(
        <Box>
        <Checkbox 
        icon={<FavoriteBorder />} 
        disabled={!token}
        checked={isCheckedStorage} 
        checkedIcon={<Favorite sx={{ color: 'red' }} />} 
        onChange={onLike} />
      </Box>
    )
}

export default Like