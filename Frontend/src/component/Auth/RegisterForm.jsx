// import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../State/Authentication/Action';
import * as Yup from "yup";

const initialValues={
    fullname:"",
    email:"",
    Password:"",
    role:"ROLE_CUSTOMER"
}

const validationSchema = Yup.object({
    fullname: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 8 characters")
      .required("Password is required"),
      role: Yup.string().required("Type is required"),
  });

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSumbit=(values)=>{
        dispatch(registerUser({userData:values,navigate}))
    }
  return (
    <div>
        <Typography variant='h5' className='text-center'>
            Register
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSumbit}>
            <Form >
            <Field
                as={TextField}
                name="fullname"
                label="full name"
                fullWidth
                variant="outlined"
                margin="normal"
                type="name"
                required
                autoComplete="fullname"
              helperText={<ErrorMessage name="fullname" />}
                />
            <Field
                as={TextField}
                name="email"
                label="email"
                fullWidth
                variant="outlined"
                margin="normal"
                type="email"
                required
                autoComplete="email"
              helperText={<ErrorMessage name="email" />}
                />
                <Field
                as={TextField}
                name="password"
                label="password"
                fullWidth
                variant="outlined"
                margin="normal"
                type="password"
                required
                id="password"
              helperText={<ErrorMessage name="password" />}
                />
                 
  <InputLabel id="role-simple-select-label">Role</InputLabel>
  <Field
  fullWidth margin='normal'
  as={Select}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={role}
    name="role"
    // onChange={handleChange}
  >
    <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
    <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
  </Field>
                <Button sx={{mt:2,padding:"1rem"}} fullWidth type='submit' variant='contained'>
                    Register
                </Button>
            </Form>
        </Formik>
        <Typography variant='body2' align='center' sx={{mt:3}}>
            have an account already?
            <Button size='small' onClick={()=>navigate("/account/login")}>
                login
            </Button>
        </Typography>
    </div>
  )
}
