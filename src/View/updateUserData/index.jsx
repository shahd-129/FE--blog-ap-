import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Updateuser() {
    const [data, setData] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    })
    async function updateData(id) {
        try {
            const res = await axios.put(
                `http://localhost:3000/user/update/${id}`,
                data,
                {
                    headers: {
                        token: localStorage.getItem('token'),
                    },
                }
            );
            setData(res?.data?.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        updateData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    return (<>

        <Box height="100vh" margin={0} display="flex" alignItems="center" justifyContent="center" backgroundColor={'#000'}>
            <Box
                height={500}
                width={500}
                my={5}
                mx={"auto"}
                display="flex"
                alignItems="center"
                justifyContent={"center"}
                gap={4}
                p={2}
                borderRadius={4}

                sx={{ border: '1px solid grey', background: 'linear-gradient(358deg, #1da1f2, #f0f0f0)' }}
            >

                <Box
                    component="form"

                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    textAlign="center"
                    p={5}
                    noValidate
                    autoComplete="off"
                >
                    <Typography
                        variant="h3"
                        component="h2"
                        textAlign="center"
                        marginY={4}
                        color='#477cb1'
                    >
                        Update Data
                    </Typography>

                    {/* {error && <Typography sx={{ color: 'red' }}>{error.data.message}</Typography>} */}
                    <TextField
                        value={data?.name}
                        name="name"
                        id="name"
                        type="text"
                        label="Name"
                        variant="outlined"
                        sx={{ borderRadius: "50%", color: "#1da1f2" }}
                        onChange={handleChange}
                    />

                    <TextField
                        value={data?.phone}
                        name="phone"
                        id="phone"
                        type="tel"
                        label="Phone"
                        variant="outlined"
                        onChange={handleChange}
                        sx={{ borderRadius: "50%", color: "#1da1f2" }} />

                    <TextField
                        value={data?.email}
                        name="email"
                        id="email"
                        type="email"
                        variant="outlined"
                        label="Email"
                        onChange={handleChange}
                        sx={{ borderRadius: "50%", color: "#1da1f2" }} />

                    <TextField
                        value={data?.password}
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        name="password"
                        onChange={handleChange}
                        variant="outlined"
                        sx={{ borderRadius: "50%", color: "#1da1f2" }} />


                    <>
                        <Button onClick={() => updateData(data._id)} sx={{ color: "#fff", background: "#1da1f2" }} type="submit" variant="contained">
                            Update data
                        </Button>
                    </>
                </Box>
            </Box>
        </Box>

    </>
    )
}
