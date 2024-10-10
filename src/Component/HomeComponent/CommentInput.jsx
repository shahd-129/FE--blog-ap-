import React, { useState } from 'react'
import { useCreateCommentMutation } from '../../Redux/Api/commentApi';
import { Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { incrementCommentCount } from '../../Redux/Slices/tokenSlice';
import { useDispatch } from 'react-redux';

export default function CommentInput({ postId }) {
    const [createComment] = useCreateCommentMutation();
    const [comment, setComment] = useState('');
    const dispatch = useDispatch()
    const {t} = useTranslation()

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            await createComment({ postId, text: comment }).unwrap();
           dispatch(incrementCommentCount(postId)) 
            setComment('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <TextField
                label={t("Add a comment")}
                variant="outlined"
                fullWidth
                value={comment}
                onChange={handleCommentChange}
                InputProps={{
                    style: { color: 'white' }, 
                }}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleCommentSubmit}>
                {t("submit")}
            </Button>
        </Box>
    )
}
