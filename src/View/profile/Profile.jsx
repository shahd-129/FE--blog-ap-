import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Box, Button, Typography, IconButton, Tooltip } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useParams } from 'react-router-dom';
import { useProfileMutation } from '../../Redux/Api/Authapi';

export default function Profile() {
  const { id } = useParams(); 
  const [profileImage, setProfileImage] = useState({ url: '/broken-image.jpg', title: '' });
  const [newImage, setNewImage] = useState(null);

  const [profile] = useProfileMutation();

  useEffect(() => {
    if (id) {
      profile(id);
    }
  }, [id, profile]);

  useEffect(() => {
    if (profile?.image) {
      setProfileImage({ url: profile.image, title: profile.name });
    }
  }, [profile]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage({ url: reader.result, title: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmImage = () => {
    if (newImage) {
      setProfileImage(newImage);
      setNewImage(null);
      // هنا يمكنك إضافة منطق لتحميل الصورة الجديدة إلى الخادم
    }
  };

  return (
    <Box padding={5} display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box position="relative">
        <Avatar 
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            margin: 3
          }} 
          src={profileImage.url} // استخدام رابط الصورة من الكائن
        />
        <input 
          type="file" 
          id="file-input"
          hidden 
          accept="image/*" 
          onChange={handleImageUpload} 
        />
        <Tooltip title="Upload Image">
          <IconButton 
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              bgcolor: 'background.paper',
              borderRadius: '50%',
              border: '2px solid',
              borderColor: 'primary.main',
              width: 30,
              height: 30,
              padding: 0
            }}
            component="label"
            htmlFor="file-input"
          >
            <CameraAltIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="h5" gutterBottom>
        {profile?.name}
      </Typography>
      {newImage && (
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleConfirmImage}
        >
          Confirm Image
        </Button>
      )}
    </Box>
  );
}

