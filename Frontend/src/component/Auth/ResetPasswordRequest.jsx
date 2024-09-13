import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { resetPasswordRequest } from "../State/Authentication/Action";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const ResetPasswordRequest = () => {

  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log("login values", values);
    dispatch(resetPasswordRequest(values.email));
  };
  return (
    <>
      {" "}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography variant="h5">Forgot Password</Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Field
              as={TextField}
              reqired
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              id="email"
              autoComplete="email"
              helperText={<ErrorMessage name="email" />}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, padding: "1rem" }}
            >
              Send Password Reset Mail
            </Button>
          </Form>
        </Formik>
      </Container>
    </>
  );
};
