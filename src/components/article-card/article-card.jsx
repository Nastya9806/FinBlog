import React, {useState} from 'react'
import { Box, Checkbox, Button, Grid, Typography, ListItem, ListItemText, Avatar } from '@mui/material';
import { FavoriteBorder, Favorite} from '@mui/icons-material';
import {cutDescription} from '../../utilities/format'
import { Link, useParams, useNavigate } from 'react-router-dom';
// import {cutDescription} from '../../utilities/format'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import ModalWindow from '../modal-delete/modal'
import { deleteArticle, setLike, fetchArticle, fetchArticles } from '../../services/kata'

function ArticleCard({post, singlePage}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { user } = useSelector((state) => state.user)
  const { location } = useSelector((state) => state.status)
  const [modal, setModal] = useState(false)
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const { token } = useSelector((state) => state.user.user)
  const onDelete = () => {
    dispatch(deleteArticle(token, slug))
    navigate('/')
  }
  const { page, limit } = useSelector((state) => state.articles)

  const onLike = (e) => {
    e.preventDefault()
    if (token) {
      dispatch(setLike(token, post.slug, post.liked))
      if(e.target.checked){
        setCheckFavorite(true);
        setFavoriteCount(favoriteCount + 1);
      }
      
      location === 'article-page'
        ? dispatch(fetchArticle(post.slug, token))
        : dispatch(fetchArticles(page, limit, token))
    }
  }
  const [checkFavorite, setCheckFavorite] = useState(post?.favorited || false);
  const [favoriteCount, setFavoriteCount] = useState(post.favoritesCount);

const editLink = `/articles/${slug}/edit`
    return ( 
      <ListItem sx={{height: '140px', cursor: 'pointer', backgroundColor: 'white', cursor: 'pointer', mt: 2 }}>
      <Grid container columnSpacing={2} sx={{height: '100%', justifyContent: 'space-between'}}>
        <Grid item xs={10} sx={{width: '682px'}}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Link to={post.slug} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" color="#1890FF" sx={{ mr: '5px' }}>
              {post.headerTitle}
            </Typography>
            </Link>
            <Checkbox icon={<FavoriteBorder />} disabled={!user} checked={checkFavorite} checkedIcon={<Favorite sx={{ color: 'red' }} />} onClick={(e) => onLike(e)} />
            <Typography sx={{ mr: '5px' }}>{post.likes}</Typography>
          </Grid>
              {post.tags && post.tags.map((item) => {
                return(
                  <Typography
                  variant="caption"
                  component="span"
                  sx={{
                    border: '1px solid grey',
                    wordWrap: 'no-wrap',
                    borderRadius: '5px',
                    padding: '3px 7px',
                    mr: '5px',
                     mt: 1,
                    maxWidth: '20px',
                    overflow: 'hidden'
                  }}
                  key={uuidv4()}
                >
                  {cutDescription(item, 20)}
                </Typography>
                )
              })}
          <ListItemText align="justify" sx={{ mt: 1 }}>
            {/* {cutDescription(post.description, 200)} */}
            {post.description}
          </ListItemText>
        </Grid>
        <Grid item xs={2} sx={{display: 'flex', flexDirection: 'row-reverse'}} >
        <Avatar variant={'square'} alt="Avatar" src={post.avatarPath} sx={{ width: 46, height: 46 }} />
          <Grid container direction="row">
            <Box>
              <Typography variant="h6">{post.username}</Typography>
              <Typography variant="body2" sx={{ color: '#808080' }}>
                {post.updatedDate}
              </Typography>
              
            </Box>
            { user && user.username === post.username && singlePage &&
              <Box sx={{ p: 0, display: 'flex', gap: '5px', justifyContent: 'space-between' }}>
                  <Button color="error" variant="outlined" sx={{ textTransform: 'none', maxWidth: '80px', maxHeight: '40px' }} onClick={openModal}>
                  Delete
                </Button>
                  <Button color="success" variant="outlined" sx={{ textTransform: 'none', maxWidth: '70px', maxHeight: '40px' }} onClick={() => navigate(editLink)}>
                    Edit
                  </Button>
              </Box>
              }
              {modal && (
                <ModalWindow modal={modal} handleCloseModal={closeModal} handleClickDelete={onDelete} />
      )}
          </Grid>
        </Grid>
      </Grid>
     </ListItem>
    )
  }

export default ArticleCard