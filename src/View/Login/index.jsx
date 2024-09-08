import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useLoginMutation } from '../../Redux/Api/Authapi';
import Joi from 'joi';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../Redux/Slices/tokenSlice';


export default function Signup() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const token = useSelector((state) => state.token.token);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const validate = (data) => {

    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }).required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required'
      }),
      password: Joi.string().pattern(new RegExp(/^[A-Z][a-z0-9]{5,10}$/)).required().messages({
        'string.pattern.base': 'Password must start with an uppercase letter and be 6-11 characters long',
        'any.required': 'Password is required'
      })
    });

    const result = schema.validate(data, { abortEarly: false });
    if (!result.error) return null;

    const validationErrors = {};
    console.log(validationErrors);
    for (let item of result.error.details) {

      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };


  function handleSubmit(event) {
    event.preventDefault();
    const errors = validate(inputValue);
    setErrors(errors);
    if (errors) return;
    login(inputValue)
      .unwrap()
      .then((response) => {
        console.log('Success:', response);
        setInputValue({
          email: '',
          password: ''
        });
        if (response?.success) {
          const newToken = response.token;
          dispatch(setToken(newToken));
          navigate("/home");
        }

      })
      .catch((err) => {
        console.error('API Error:', err);
      });
  }




  function handleChange(event, identifier) {
    setInputValue((prev) => ({
      ...prev,
      [identifier]: event.target.value
    }));
  }
  function backToSignup() {
    navigate("/signup");
  }
  return (
    <>
   <Box height="100vh" margin={0} display="flex" alignItems="center" justifyContent="center" backgroundColor={'#200930'}>
   <Box
        height={400}
        width={400}
        my={6}
        mx={"auto"}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        gap={4}
        p={2}
        borderRadius={4}
        sx={{ border: '1px solid grey', background: 'linear-gradient(358deg, #1da1f2, #f0f0f0)' }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          textAlign="center"
          p={5}
          noValidate
          autoComplete="off">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            marginY={4}
            color='#477cb1'
          >
            Login Now....
          </Typography>



          {error && <Typography sx={{ color: 'red' }}>{error.data.message}</Typography>}
          <TextField
            value={inputValue.email}
            name="email"
            id="email"
            type="email"
            variant="outlined"
            label="Email"
            onChange={(event) => handleChange(event, 'email')}
            error={!!errors?.email}
            helperText={errors?.email}
            sx={{ borderRadius: "50%", color: "#1da1f2" }}
          />
          <TextField
            value={inputValue.password}
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            onChange={(event) => handleChange(event, 'password')}
            variant="outlined"
            error={!!errors?.password}
            helperText={errors?.password}
            sx={{ borderRadius: "50%", color: "#1da1f2" }}
          />
          {isLoading ?
            <CircularProgress sx={{color:"#1da1f2"}} />
            :
            <>
              <Button sx={{ color: "#fff", background: "#1da1f2" }} type="submit" variant="contained">
                Login
              </Button>
              <Link
                component="button"
                variant="body2"
                sx={{color:"#1da1f2"}}
                onClick={() => {
                  backToSignup();
                }}
              >
                Don't have an account?
              </Link>
            </>}

        </Box>
      </Box>
   </Box>
    
    </>
  );
}
