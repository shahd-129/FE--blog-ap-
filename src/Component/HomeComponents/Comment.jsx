import React, { useState } from 'react'
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '../../Redux/Api/commentApi';

export default function Comment({
    userId,
    comment,
    editCommentId,
    setEditCommentId,
}) {

    const [deleteComment] = useDeleteCommentMutation();
    const [updateComment] = useUpdateCommentMutation();

    const onDeleteComment = async () => {
        try {
            await deleteComment(comment?._id).unwrap();
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    }

    const [editCommentText, setEditCommentText] = useState('');
    const handleEditCommentChange = (e) => {
        setEditCommentText(e.target.value);
    }

    const onUpdateComment = async () => {
        try {
            const res = await updateComment({ id: editCommentId, data: { text: editCommentText } }).unwrap();
            // setPost((prevPosts) =>
            //     prevPosts.map((post) => ({
            //         ...post,
            //         comments: post.comments.map((comment) =>
            //             comment._id === editCommentId
            //                 ? { ...comment, text: res.data.text } : comment
            //         ),
            //     }))
            // );

            setEditCommentText('');
            setEditCommentId(null);
        } catch (err) {
            console.error("Error updating comment:", err);
        }
    };

    const onEditComment = (commentId, commentText) => {
        setEditCommentText(commentText);
        setEditCommentId(commentId);
    };
      
    return (

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
                    <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={onUpdateComment}>
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
                            <IconButton sx={{ color: '#1976d2' }} onClick={() => onEditComment(comment?._id, comment?.text)} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#1976d2' }} onClick={onDeleteComment} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Box> : ""
                    }

                </>
            )}
        </Box>

    )
}
