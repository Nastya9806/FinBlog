import React from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
// import styles from '../new-article/new-article.module.scss'
import { addTag, deleteTag, editTag } from '../../redux/tags'
import { Box, Button, TextField } from '@mui/material';
// const tagStyle = classNames(styles.input, styles.tag)
// const deleteBtn = classNames(styles.btn, styles.delete)
// const addBtn = classNames(styles.btn, styles.add)

function Tag({ id, idx, tagsLength, value }) {

  const lastOne = idx === tagsLength - 1

  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(deleteTag(id))
  }

  const onAdd = () => {
    dispatch(addTag())
  }

  const onLabelChange = (val) => {
    if (val !== undefined) {
      dispatch(
        editTag({
          id,
          label: val.trim(),
        })
      )
    }
  }

  return (
    <>
              <Box key={uuidv4()} sx={{ mb: 2 }}>
                <TextField 
                type="text"
                id={id} 
                value={value} 
                size="small" sx={{ mr: 2 }}
                onChange={(e) => onLabelChange(e.target.value)}
                />
               {tagsLength > 1 && <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    textTransform: 'none',
                  }}
                //   onClick={() => handleClickDeleteTag(id)}
                >
                  Delete
                </Button>}
                {lastOne &&  <Button
            variant="outlined"
            sx={{
              mb: 2,
              textTransform: 'none',
            }}
            onClick={onAdd}
          >
            Add Tag
          </Button>}
              </Box>
    </>
  )
}

export default Tag