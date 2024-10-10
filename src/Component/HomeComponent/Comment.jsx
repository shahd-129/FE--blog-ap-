import React, { useState } from 'react'
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '../../Redux/Api/commentApi';
import { useTranslation } from 'react-i18next';
import { decrementCommentCount } from '../../Redux/Slices/tokenSlice';
import { useDispatch } from 'react-redux';

export default function Comment({
    userId,
    comment,
    editCommentId,
    setEditCommentId,
    postId
}) {
    const {t} = useTranslation()
    const [deleteComment] = useDeleteCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const dispatch = useDispatch()

    const handelDeleteComment = async () => {
        try {
            await deleteComment(comment?._id).unwrap();
            dispatch(decrementCommentCount({ postId }));
        } catch (err) {
            console.error( err);
        }
    }

    const [editCommentText, setEditCommentText] = useState('');
    const handleEditCommentChange = (e) => {
        setEditCommentText(e.target.value);
    }

    const handelUpdateComment = async () => {
        try {
            await updateComment({ id: editCommentId, data: { text: editCommentText } }).unwrap();
            setEditCommentText('');
            setEditCommentId(null);
        } catch (err) {
            console.error(err);
        }
    };

    const onEditComment = (commentId, commentText) => {
        setEditCommentText(commentText);
        setEditCommentId(commentId);
    };
      
    return (

        <Box key={comment?._id} sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: "#fff" }}>
                {comment?.userName}
            </Typography>
            {editCommentId === comment?._id ? (
                <Box>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={editCommentText}
                        onChange={handleEditCommentChange}
                    />
                    <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handelUpdateComment}>
                      {t("update comment")}
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
                            <IconButton sx={{ color: '#1976d2' }} onClick={handelDeleteComment} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Box> : ""
                    }

                </>
            )}
        </Box>

    )
}
