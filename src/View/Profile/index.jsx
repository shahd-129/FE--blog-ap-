import { Box, Typography, Card, CardContent, CardMedia, Grid, CardHeader, Avatar, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';
import Homemenu from 'Component/HomeMenu/Homemenu';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearToken } from '../../Redux/Slices/tokenSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.token?.user?.userId)

    // Fetch profile data
    async function getProfileData(userId) {
        try {
            const res = await axios.get(`http://localhost:3000/user/getuser/${userId}`, {
                headers: {
                    token: localStorage.getItem('token'),
                },
            }
            );
            console.log(res?.data.success);

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
        <Box display="flex" flexDirection="column" alignItems="center" padding={5} margin="auto" maxWidth={800} >
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
                            marginBottom: 2
                        }}
                    >
                        {userData.name[0]}
                    </Avatar>
                    {
                        userId === userData._id ? <IconButton onClick={() => deleteUser(id)} aria-label="delete">
                            <DeleteIcon /> Delete Account
                        </IconButton> : ""
                    }

                    <Typography variant="h4" gutterBottom>
                        {userData?.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        {userData?.email}
                    </Typography>
                </Box>
            )}

            <Grid container spacing={4} justifyContent="center">
                {userPosts && userPosts.length > 0 ? (
                    userPosts.map((post) => (
                        <Grid item xs={12} sm={6} md={6} key={post?._id}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    padding: 2,
                                    boxShadow: 5,
                                    marginBottom: 2,
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: 7,
                                    },
                                }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="user-avatar">
                                            {post?.userName[0]}
                                        </Avatar>
                                    }
                                    action={<Homemenu postId={post._id} userId={post.userId} />}
                                    title={post?.userName}
                                    subheader={new Date(post?.date).toLocaleDateString()}
                                />
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={post?.image?.url}
                                    alt="Post image"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {post?.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                        {post?.content}
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" padding={5} color="#fff">
                        No posts available.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
}
