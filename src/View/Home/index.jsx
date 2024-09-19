import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

import { Grid, TextField, Button } from '@mui/material';
import { useCreateCommentMutation, useDeleteCommentMutation, useUpdateCommentMutation } from '../../Redux/Api/commentApi';
// import { useAddReactMutation } from '../../Redux/Api/postApi';
import Homemenu from '../../Component/HomeMenu/Homemenu';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CreatePost } from 'View';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  // const [addReact] = useAddReactMutation();
  const userId = useSelector((state) => state.token?.user?.userId);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentIconClick = (postId) => {
    setShowCommentInput((prev) => (prev === postId ? null : postId));
    setEditCommentId(null);
  };

  async function getAllPost() {
    try {
      const { data } = await axios.get('http://localhost:3000/post/getAllPost', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setPost(data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    getAllPost();
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const res = await createComment({ postId, text: comment }).unwrap();
      setPost((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: [...post.comments, res.data], commentCount: post.commentCount + 1 } : post
        )
      );
      console.log(post._id);

      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      const res = await updateComment({ id: editCommentId, data: { text: editCommentText } }).unwrap();
      setPost((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.map((comment) =>
            comment._id === editCommentId
              ? { ...comment, text: res.data.text } : comment
          ),
        }))
      );
      setEditCommentId(null);
      setEditCommentText('');
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };


  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId).unwrap();
      setPost((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          comments: post.comments.filter((comment) => comment._id !== commentId),
          commentCount: Math.max(post.commentCount - 1, 0)
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditCommentText(commentText);
  };

  const handleEditCommentChange = (e) => {
    setEditCommentText(e.target.value);
  };

  return (
    <>
      <Grid item xs={12} md={9}>
        <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: 5, alignItems: 'center', gap: 3, width: '100%' }}>
          <CreatePost refreshPosts={getAllPost} />
          {post.map((el) => (<>
            <Card
              key={el?._id}
              sx={{
                maxWidth: 600,
                width: 600,
                borderRadius: 8,
                padding: 2,
                background: '#1c1c1e',
                boxShadow: 3,
                marginBottom: 2,
                overflow: 'hidden',
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

                  </Avatar>
                }
                action={<Homemenu postId={el?._id} userId={el?.userId} imagePost={el?.image?.url} contentPost={el?.content} />}
                title={<Link to={`/profile/${el.userId}`} style={{ textDecoration: 'none', color: '#ffffff' }}>
                  {el?.userName}
                </Link>}
                subheader={<Typography variant="body2" color="#ffffff">{new Date(el?.date).toLocaleDateString()}</Typography>}
              />
              <Typography variant="body2" color="#ffffff">
                {el?.content}
              </Typography>
              <CardContent>
                <CardMedia
                  component="img"
                  height="auto"
                  image={el?.image?.url}
                  alt="Post image"
                  sx={{ width: '100%', cursor: 'pointer', objectFit: 'cover' }}
                />
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon sx={{ color: '#1976d2' }} />
                </IconButton>
                <Badge badgeContent={el?.commentCount} color="primary" overlap="circular">
                  <IconButton aria-label="comment" onClick={() => handleCommentIconClick(el._id)}>
                    <CommentIcon sx={{ color: '#1976d2' }} />
                  </IconButton>
                </Badge>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  sx={{ color: "#fff" }}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit >
                <CardContent>
                  <Typography sx={{ color: '#fff' }} paragraph>Comments:</Typography>
                  {el.comments?.map((comment) => (
                    <Box key={comment?._id} sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: "#fff" }}>
                        {comment.userName}
                      </Typography>
                      {editCommentId === comment?._id ? (
                        <Box>
                          <TextField
                            variant="outlined"
                            fullWidth
                            value={editCommentText}
                            onChange={handleEditCommentChange}
                          />
                          <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleUpdateComment}>
                            Update Comment
                          </Button>
                        </Box>
                      ) : (
                        <>
                          <Typography color='#fff' variant="body2">
                            {comment?.text}
                          </Typography>
                          {userId === comment.userId ?
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <IconButton sx={{ color: '#1976d2' }} onClick={() => handleEditComment(comment?._id, comment?.text)} aria-label="edit">
                                <EditIcon />
                              </IconButton>
                              <IconButton sx={{ color: '#1976d2' }} onClick={() => handleDeleteComment(comment?._id)} aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            </Box> : ""
                          }

                        </>
                      )}
                    </Box>
                  ))}

                  {showCommentInput === el._id && (
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        value={comment}
                        onChange={handleCommentChange}
                      />
                      <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => handleCommentSubmit(el._id)}>
                        Submit
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </>
          ))}
        </Box>
      </Grid>
    </>
  );
} 
