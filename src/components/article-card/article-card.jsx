import React, {useState} from 'react'
import { Box, Button, Grid, Typography, ListItem, ListItemText, Avatar } from '@mui/material'
import {cutDescription, cutTitle} from '../../utilities/format'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux';
import ModalWindow from '../modal-delete/modal'
import { deleteArticle } from '../../services/kata'
import Like from '../like/like'

function ArticleCard({post, singlePage}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const { user } = useSelector((state) => state.user)
  const [modal, setModal] = useState(false)
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const { token } = useSelector((state) => state.user.user)
  const onDelete = () => {
    dispatch(deleteArticle(token, slug))
    // navigate('/')
    navigate('/', { replace: true })  
}

const editLink = `/articles/${slug}/edit`
    return ( 
      <ListItem sx={{height: '140px', cursor: 'pointer', backgroundColor: 'white', cursor: 'pointer', mt: 2 }}>
      <Grid container columnSpacing={2} sx={{height: '100%', justifyContent: 'space-between'}}>
        <Grid item xs={10} sx={{width: '682px', wordWrap: 'break-word'}}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Link to={`/articles/${post.slug}`} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" color="#1890FF" sx={{ mr: '5px' }}>
              {cutTitle(post.headerTitle)}
            </Typography>
            </Link>
            <Like key={uuidv4()} user={user} token={token} post={post}/>
            <Typography sx={{ mr: '5px' }}>{post.likes}</Typography>
          </Grid>
              {post.tags && post.tags.map((item) => {
              return item ? (
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
                  {cutTitle(item)}
                </Typography>
                ) : null
              })}
          <ListItemText align="justify" sx={{ mt: 1 }}>
            {!singlePage && cutDescription(post.description, 200) || post.description}
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