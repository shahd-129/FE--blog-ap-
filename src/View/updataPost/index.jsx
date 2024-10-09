import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdatePostMutation } from '../../Redux/Api/postApi'; 
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({ idPost , currentContent , currentImage  }) { 
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(currentContent);
  const [image, setImage] = useState(currentImage);
  const {t} = useTranslation()
  const [updatePost, { isLoading}] = useUpdatePostMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('image', image); 
  
       await updatePost({ id: idPost, data: formData }).unwrap();  
    
  
      console.log("Post updated successfully");
      handleClose(); 
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  

  return (
    <Box>
      <Button onClick={handleOpen}>{t("update post")}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("update post")}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Avatar sx={{ bgcolor: 'red', width: 45, height: 45 }}>
              <img src='' alt="User Avatar" style={{ width: '50%', height: '50%', borderRadius: '50%' }} />
            </Avatar>
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
             {t("user")}
            </Typography>
          </Box>

          <TextField
            label={t("content")}
            multiline
            rows={4}
            variant="outlined"
            sx={{ marginBottom: 2, width: '100%' }}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <TextField
            type="file"
            accept="image/*"
            variant="outlined"
            sx={{ marginBottom: 2, width: '100%' }}
            onChange={handleImage}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginLeft: 'auto' }}
              disabled={isLoading}
            >
              {isLoading ? t("Loading") : t("submit")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}