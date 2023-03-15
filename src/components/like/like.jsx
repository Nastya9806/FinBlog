import React, {useState, useEffect} from 'react'
import { setLike } from '../../services/kata'
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material'
import { FavoriteBorder, Favorite} from '@mui/icons-material';
import Box from '@mui/material/Box';
import {setLoading} from '../../redux/slices/articles'
import Spin from '../../UI/spin/spin'

function Like({ token, post }) {
    const [favoriteCount, setFavoriteCount] = useState(post.favoritesCount);
    const dispatch = useDispatch()
    const isCheckedStorage = localStorage.getItem(`${post.slug}`) && token && post.likes !== 0 ? true : false

    const onLike = () => {  
        if (post.slug) {
          (setLoading('loading'))
          dispatch(setLike(token, post.slug, post.liked))
          localStorage.setItem(`${post.slug}`, `${post.slug}`)
    }

      }

      useEffect(() => {
      setFavoriteCount(favoriteCount + 1)  
      }, [onLike])

    const {loadingData} = useSelector(state => state.articles);

    const likeBox = (<Box>
      <Checkbox 
      icon={<FavoriteBorder />} 
      disabled={!token}
      checked={isCheckedStorage} 
      checkedIcon={<Favorite sx={{ color: 'red' }} />} 
      onChange={onLike} />
    </Box>)

  const isLoading = (load) => {
      if(load !== 'done'){
        return <Spin /> && likeBox
      } else{
        return likeBox
      }
    }


    
    const showContent = isLoading(loadingData)
  
    return(
      <>
      {showContent}
      </>
    )
}

export default Like