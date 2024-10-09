import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useSignUpMutation } from '../../Redux/Api/Authapi';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { validate } from 'util/joiValidation';
import { useTranslation } from 'react-i18next';


export default function Signup() {
  const {t} = useTranslation()
  const [inputValue, setInputValue] = useState({
    email: '',
    name: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation()

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(inputValue);
    console.log(inputValue);
    setErrors(validationErrors);
    if (validationErrors) return;

    signUp(inputValue)
      .unwrap()
      .then((response) => {
        console.log(response);
        setInputValue({
          email: '',
          userName: '',
          phone: '',
          password: '',
        });

        navigate("/login");
      })

      .catch((err) => {
        console.error(err);
      });
  }


  function handleChange(event, identifier) {
    setInputValue((prev) => ({
      ...prev,
      [identifier]: event.target.value

    }));
  }

  function backToLogin() {
    navigate("/login");
  }

  return (
    <>
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center" backgroundColor={'#200930'}>
        <Box
          // height={500}
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
            onSubmit={handleSubmit}
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
             {t("signup")} 
            </Typography>

            {/* {error && <Typography sx={{ color: 'red' }}>{error.data.message}</Typography>} */}
            <TextField
              value={inputValue.name}
              name={t("Name")}
              id="name"
              type="text"
              label={t("Name")}
              variant="outlined"
              sx={{ borderRadius: "50%", color: "#1da1f2" }}
              onChange={(event) => handleChange(event, 'name')}
              error={!!errors?.name}
              helperText={errors?.name}/>

            <TextField
              value={inputValue.phone}
              name={t("phone")}
              id="phone"
              type="tel"
              label={t("phone")}
              variant="outlined"
              onChange={(event) => handleChange(event, 'phone')}
              error={!!errors?.phone}
              helperText={errors?.phone}
              sx={{ borderRadius: "50%", color: "#1da1f2" }}/>

            <TextField
              value={inputValue.email}
              name={t("email")}
              id="email"
              type="email"
              variant="outlined"
              label={t("email")}
              onChange={(event) => handleChange(event, 'email')}
              error={!!errors?.email}
              helperText={errors?.email}
              sx={{ borderRadius: "50%", color: "#1da1f2" }}/>

            <TextField
              value={inputValue.password}
              id="password"
              label={t("Password")}
              type="password"
              autoComplete="current-password"
              name={t("Password")}
              onChange={(event) => handleChange(event, 'password')}
              variant="outlined"
              error={!!errors?.password}
              helperText={errors?.password}
              sx={{ borderRadius: "50%", color: "#1da1f2" }}/>

            {isLoading ?
              <CircularProgress sx={{ color: "#1da1f2" }} />
              :
              <>
                <Button sx={{ color: "#fff", background: "#1da1f2" }} type="submit" variant="contained">
                 {t("signup")}
                </Button>
                <Link
                  component="button"
                  variant="body2"
                  color='secondary'
                  onClick={() => {
                    backToLogin();
                  }}
                >
                 {t("Already have an account?")}
                </Link>
              </>}
          </Box>
        </Box>
      </Box>
    </>
  );
}