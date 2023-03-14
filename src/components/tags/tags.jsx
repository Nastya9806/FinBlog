import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addTag, deleteTag, editTag } from '../../redux/tags'
import { Box, Button, TextField, Stack } from '@mui/material';

function Tag({ id, idx, tagsLength, value }) {

  const lastOne = idx === tagsLength - 1

  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(deleteTag(id))
  }

  const onAdd = () => {
    dispatch(addTag())
  }
  const [tagName, setTagValue] = useState('');
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
              <Box key={uuidv4()} sx={{ mb: 2, display: 'flex' }}>
                <TextField 
                type="text"
                id={id} 
                value={value} 
                size="small" sx={{ mr: 2 }}
                onChange={(event) => {
                  onLabelChange(event.target.value)
                }}
                />
                <Stack direction="row" spacing={1}>
               {tagsLength > 1 && <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    textTransform: 'none',
                  }}
                  onClick={() => onDelete(id)}
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
          </Button>
          }
          </Stack>
              </Box>
    </>
  )
}

export default Tag