// import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../State/Authentication/Action';
// import {loginUser} from '../State/Authentication/Action'

const initialValues={
    email:"",
    Password:""
}
const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const handleSumbit=(values)=>{
        console.log(values);
       dispatch(loginUser({userData:values,navigate}))
    }
  return (
    <div>
        <Typography variant='h5' className='text-center'>
            Login
        </Typography>
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSumbit}>
            <Form>
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
                autoComplete="current-password"
              helperText={<ErrorMessage name="password" />}
                />
                <Button 
                sx={{mt:2,padding:"1rem",fontSize:"1rem",fontWeight:"100"}} 
                fullWidth 
                type='submit' 
                variant='contained'>
                    Login
                </Button>
            </Form>
        </Formik>
        <Typography variant='body2' align='center' sx={{mt:3}}>
            Don't Have Account?
            <Button size='small' onClick={()=>navigate("/account/register")}>
                Register
            </Button>
        </Typography>
    </div>
  )
}
