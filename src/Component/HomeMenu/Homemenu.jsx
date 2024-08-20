import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeletePostMutation, useUpdatePostMutation } from '../../Redux/Api/postApi';
import { useSelector } from 'react-redux';

export default function Homemenu() {
  const userId = useSelector((state) => state.user.userId);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [deletePost] = useDeletePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleDeletePost = async () => {
    // if (!userId) {
    //   console.error('Post ID is missing, cannot delete the post');
    //   return;
    // }
  
    try {
      await deletePost(userId).unwrap();  // Ensure postId is passed correctly
      console.log('Post deleted successfully');
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };
  





  const handleUpdatePost = () => {
    updatePost()
    console.log('Update Post clicked');
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleDeletePost} >
          <Button variant="contained" color="error" >
            Delete Post
          </Button>
        </MenuItem>
        <MenuItem onClick={handleUpdatePost}>
          <Button variant="contained" color="primary">
            Update Post
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}
