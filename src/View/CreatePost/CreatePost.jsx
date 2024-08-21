import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Avatar } from '@mui/material';
import { useCreatePostMutation } from '../../Redux/Api/postApi';
import { useSelector } from 'react-redux';

export default function CreatePost({ refreshPosts }) {
  const userId = useSelector((state) => state.user.userId);
  const [createPost] = useCreatePostMutation();
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('userId', userId); 
    if (image) {
      formData.append('image', image);
    }

    try {
      const req = await createPost(formData).unwrap();
      console.log(req);
      setContent('');
      setImage(null);
      if (refreshPosts) refreshPosts();
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
        padding: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 5,
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
      }}>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, width: '100%' }}>
        <Avatar sx={{ bgcolor: 'red'[500], width: 56, height: 56 }}>
          <img src='' alt="User Avatar" style={{ width: '50%', height: '50%', borderRadius: '50%' }} />
        </Avatar>
        <Typography variant="body1" sx={{ marginLeft: 2 }}>
          User
        </Typography>
      </Box>

      <TextField
        label="Content"
        multiline
        rows={4}
        variant="outlined"
        sx={{ marginBottom: 2, width: '100%', backgroundColor: '#3a3b3c' }}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <TextField
        type="file"
        accept="image/*"
        variant="outlined"
        sx={{ marginBottom: 2, width: '100%', backgroundColor: '#3a3b3c' }}
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