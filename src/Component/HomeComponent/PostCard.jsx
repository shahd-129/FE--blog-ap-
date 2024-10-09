import React from 'react';
import Comment from './Comment';
import CommentInput from './CommentInput.jsx';
import { Card, CardHeader, Avatar, CardContent, CardMedia, CardActions, IconButton, Collapse, Typography, Badge, styled } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { HomeMenu } from 'Component';
import { useTranslation } from 'react-i18next';

const ExpandMoreButton = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostCard({
    post
}) {
    const {t} = useTranslation()
    const [expanded, setExpanded] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(null);

    const [editCommentId, setEditCommentId] = useState(null);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const handleCommentIconClick = (postId) => {
        setShowCommentInput((prev) => (prev === postId ? null : postId));
        setEditCommentId(null);
    };

    return (
        <Card
            key={post?._id}
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
                action={<HomeMenu postId={post?._id} userId={post?.userId} imagePost={post?.image?.url} contentPost={post?.content} />}
                title={<Link to={`/profile/${post?.userId}`} style={{ textDecoration: 'none', color: '#ffffff' }}>
                    {post?.userName}
                </Link>}
                subheader={<Typography variant="body2" color="#ffffff">{new Date(post?.date).toLocaleDateString()}</Typography>}
            />
            <Typography variant="body2" color="#ffffff">
                {post?.content}
            </Typography>
            <CardContent>
                <CardMedia
                    component="img"
                    height="auto"
                    image={post?.image?.url}
                    alt="Post image"
                    sx={{ width: '100%', cursor: 'pointer', objectFit: 'cover' }}
                />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: '#1976d2' }} />
                </IconButton>
                <Badge badgeContent={post?.commentCount} color="primary" overlap="circular">
                    <IconButton aria-label="comment" onClick={() => handleCommentIconClick(post._id)}>
                        <CommentIcon sx={{ color: '#1976d2' }} />
                    </IconButton>
                </Badge>
               
                <ExpandMoreButton
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ color: "#fff" }}
                >
                    <ExpandMoreIcon />
                </ExpandMoreButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography sx={{ color: '#fff' }} paragraph>{t("commnets")}:</Typography>
                    {post?.comments?.map((comment) => (
                        <Comment
                            key={comment?._id}
                            comment={comment}
                            userId={post.userId}
                            editCommentId={editCommentId}
                            setEditCommentId={setEditCommentId}
                        />
                    ))}

                    {showCommentInput === post._id && (
                        <CommentInput postId={post?._id} />
                    )}
                </CardContent>
            </Collapse>
        </Card>
    )
}
