import React, { useState } from 'react'
import { useCreateCommentMutation } from '../../Redux/Api/commentApi';
import { Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CommentInput({ postId }) {
    const [createComment] = useCreateCommentMutation();
    const [comment, setComment] = useState('');
    const {t} = useTranslation()

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            await createComment({ postId, text: comment }).unwrap();
            setComment('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            <TextField
                label="Add a comment"
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
