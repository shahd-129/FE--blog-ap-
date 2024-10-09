import { AppBar, IconButton, Toolbar, Typography, Menu, MenuItem, Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../../Redux/Slices/tokenSlice';
import { AccountCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const { t, i18n } = useTranslation()
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
                    <Typography onClick={goToHome} variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
                        {t("title")}
                    </Typography>
                    {i18n.language === "en"
                        ? <Button onClick={() => i18n.changeLanguage('ar')}>العربية</Button>
                        : <Button onClick={() => i18n.changeLanguage('en')}>en</Button>
                    }



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
                        {t("profile")}
                    </MenuItem>
                </Link>
                <MenuItem onClick={Logout}>
                    {t("logout")}
                </MenuItem>
                <Link to={"/update-user/" + userId} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem>
                        {t("update acc")}
                    </MenuItem>
                </Link>

            </Menu>
        </>
    );
}
