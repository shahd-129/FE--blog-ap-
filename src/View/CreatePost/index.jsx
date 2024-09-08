import { useState } from 'react';
import { Button, TextField, Box, Typography, Avatar } from '@mui/material';
import { useCreatePostMutation } from '../../Redux/Api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../Redux/Slices/tokenSlice';


export default function CreatePost({ refreshPosts , userName }) {
  
  const userId = useSelector((state) => state.token?.user?.userId);
  const [createPost] = useCreatePostMutation();
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const dispatch = useDispatch()
  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setUserId(userId))
    const formData = new FormData();
    formData.append('content', content);
    formData.append('userId', userId);
    formData.append('image', image);

    try {
      await createPost(formData).unwrap();
      setContent('');
      setImage(null);
     refreshPosts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#463f3f',
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 2,
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
      }}>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, width: '100%' }}>
        <Avatar sx={{ bgcolor: 'red'[500], width: 45, height: 45 }}>
          <img src='' alt="User Avatar" style={{ width: '50%', height: '50%', borderRadius: '50%' }} />
        </Avatar>
        <Typography variant="body1" sx={{ marginLeft: 2 }}>
          user
        </Typography>
      </Box>

      <TextField
        label="Content"
        multiline
        rows={4}
        variant="filled"
        sx={{ marginBottom: 2, width: '100%', backgroundColor: '#463f3f' }}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <TextField
        type="file"
        accept="image/*"
        variant="outlined"
        sx={{ marginBottom: 2, width: '100%', backgroundColor: '#463f3f' }}
        onChange={handleImage}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginLeft: 'auto' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}