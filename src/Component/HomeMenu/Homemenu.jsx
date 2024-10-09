import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeletePostMutation } from '../../Redux/Api/postApi';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPostId } from '../../Redux/Slices/tokenSlice';
import { useState } from 'react';
import CustomModal from 'View/updataPost';
import { useTranslation } from 'react-i18next';

export default function Homemenu({ postId , userId ,  contentPost , imagePost }) {  
  const userToken = useSelector((state) => state.token?.user?.userId);  
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [deletePost] = useDeletePostMutation();
  const {t} = useTranslation()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    try {
      dispatch(setPostId(postId));
      await deletePost(postId).unwrap();
      console.log('Post deleted successfully');
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };
    
  return (
    <>
      {userId === userToken && (
        <Box>
          <IconButton onClick={handleClick} sx={{color: "white"}}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ maxHeight: 48 * 4.5, width: '25ch' }}
          >
            <MenuItem onClick={handleDeletePost}>{t("delete post")}</MenuItem>
            <MenuItem>
              <CustomModal idPost={postId} currentContent={contentPost}  currentImage={imagePost} />
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}
