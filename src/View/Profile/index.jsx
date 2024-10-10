import { Box, Typography, Grid, Avatar, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearToken } from '../../Redux/Slices/tokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from 'Component/HomeComponent/PostCard';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.token?.user?.userId);
  const { t } = useTranslation();

  // Fetch profile data
  async function getProfileData(userId) {
    try {
      const res = await axios.get(`http://localhost:3000/user/getuser/${userId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setUserData(res?.data?.data);
      setUserPosts(res?.data?.data?.posts);
    } catch (error) {
      console.error(error);
    }
  }

  // Delete user account
  async function deleteUser(userId) {
    try {
      const res = await axios.delete(`http://localhost:3000/user/delete/${userId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      if (res?.data.success) {
        dispatch(clearToken());
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProfileData(id);
  }, [id]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={5} margin="auto" maxWidth={800}>
      {userData && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom={4}
          sx={{
            padding: 3,
            borderRadius: 5,
            backgroundColor: '#fff',
            boxShadow: 3,
            textAlign: 'center',
            width: '100%',
            maxWidth: 600,
          }}
        >
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 100,
              height: 100,
              fontSize: 32,
              marginBottom: 2,
            }}
          >
            {userData.name?.[0]}
          </Avatar>
          {userId === userData?._id && (
            <IconButton onClick={() => deleteUser(id)} aria-label="delete">
              <DeleteIcon /> {t("delete acc")}
            </IconButton>
          )}
          <Typography variant="h4" gutterBottom>
            {userData?.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {userData?.email}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post) => (
              <Grid item xs={12} key={post?._id}>
                <PostCard post={post} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" padding={5} color="#fff">
              {t("No posts available yet.")}
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
