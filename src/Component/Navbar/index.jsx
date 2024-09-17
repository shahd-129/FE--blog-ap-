import { AppBar, IconButton, Toolbar, Typography, Menu, MenuItem, Avatar } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken} from '../../Redux/Slices/tokenSlice';
import {  AccountCircle } from '@mui/icons-material';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.token?.user?.userId)
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    function Logout() {
        dispatch(clearToken());
        navigate('/login');
    }
    function goToHome() {
        navigate('/home');
    }

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    return (
        <>
            <AppBar position="fixed" sx={{ background: '#18191a' }}>
                <Toolbar>
                    <Typography  onClick={goToHome} variant="h6" component="div" sx={{ flexGrow: 1 , cursor:"pointer" }}>
                        Blog App
                    </Typography>
                    <IconButton
                        onClick={handleMenuOpen}
                        sx={{ marginLeft: 2 }}
                    >
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                    </IconButton>
                
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        width: '200px',
                        maxWidth: '200px',
                    },
                }}
            >
               <Link to={"/profile/" + userId} style={{ textDecoration: 'none', color: 'inherit' }}>
               <MenuItem onClick={() => { handleMenuClose() }}>
                    Profile
                </MenuItem>
               </Link> 
                <MenuItem onClick={Logout}>
                    Logout
                </MenuItem>
                <Link to={"/update-user/" + userId} style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>
                    Update Account
                </MenuItem>
                </Link>
               
            </Menu>
        </>
    );
}
