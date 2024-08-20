import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Link } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

const navigate =  useNavigate()
function createPost(){
    navigate('/create-post')
}



  return (
    <Box sx={{
      width: 300,
      height: 'calc(100vh - 50px)',
      background: 'linear-gradient(358deg, #5411113d, #f0f0f0)',
      borderRadius: 2,
      boxShadow: '1px 1px 1px #b3b3b3, -1px -1px 1px #f0f0f0',
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Avatar src="profile-pic.jpg" alt="Profile Picture" sx={{ width: 50, height: 50, margin: 'auto' }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Ryan Rumbler</Typography>
        <Link href='#' variant="body2" sx={{ color: '#571f74', textDecoration: 'none' }}>See your profile</Link>
      </Box>
      <List>
        <ListItem button>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>

          <ListItemText onClick={createPost} primary="Create Post" />

        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Just For You" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;





