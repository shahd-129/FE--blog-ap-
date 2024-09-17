import { useState } from 'react'; 
import { Button, TextField, Box, Typography, Avatar, IconButton } from '@mui/material';
import { useCreatePostMutation } from '../../Redux/Api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../Redux/Slices/tokenSlice';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

export default function CreatePost({ refreshPosts }) {
  const userId = useSelector((state) => state.token?.user?.userId);
  const [createPost] = useCreatePostMutation();
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(setUserId(userId));
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
        backgroundColor: '#1c1c1e',
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 2,
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        color: '#fff'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, width: '100%' }}>
        <Avatar sx={{ width: 45, height: 45 }}>
          <img src=''alt='' style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </Avatar>
        <Typography variant="body1" sx={{ marginLeft: 2 }}>
         
        </Typography>
      </Box>
      <TextField
        placeholder="What are you thinking?"
        multiline
        rows={2}
        variant="outlined"
        sx={{
          marginBottom: 2,
          width: '100%',
          backgroundColor: '#2c2c2e',
          borderRadius: '20px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            color: '#fff'
          }
        }}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 1 }}>
        <IconButton component="label">
          <PhotoCameraIcon sx={{ color: '#0a84ff' }} />
          <input type="file" accept="image/*" hidden onChange={handleImage} />
        </IconButton>
        {/* <IconButton>
          <EmojiEmotionsIcon sx={{ color: '#ffcc00' }} />
        </IconButton> */}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: '100%', marginTop: 1 }}
      >
        Submit
      </Button>
    </Box>
  );
}
