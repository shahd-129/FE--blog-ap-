import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../Redux/Slices/tokenSlice';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function Logout() {
        dispatch(clearToken());
        navigate('/login');
    }

    return (
        <>
            <AppBar position="fixed" sx={{ background: '#200930' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Blog App
                    </Typography>
                    <Button onClick={Logout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}
