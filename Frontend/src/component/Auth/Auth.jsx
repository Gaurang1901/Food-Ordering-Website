import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "../Cart/Cart";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { ResetPasswordRequest } from "./ResetPasswordRequest";
import { ResetPasswordForm } from "./ResetPasswordForm";
import Button from '@mui/material/Button';

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnClose = () => {
    navigate("/");
  };
  return (
    <>
      <Modal
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login" ||
          location.pathname === "/account/reset-password-request" ||
          location.pathname === "/account/reset-password"
        }
        onClose={handleOnClose}
      >
        <Box sx={style}>
        {location.pathname === "/account/register" ? (
            <RegisterForm/>
          ) : location.pathname === "/account/login" ? (
            <LoginForm />
          ) : location.pathname === "/account/reset-password" ? <ResetPasswordForm/>: (
            <ResetPasswordRequest />
          )}
           <div className="flex justify-center mt-5">
            {location.pathname === "/account/reset-password-request" || location.pathname === "/account/reset-password"  ? (
              <Button onClick={() => navigate("/account/login")}>
                Go Back To Login
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/account/reset-password-request")}
              >
                Forgot Pasword
              </Button>
            )}
            </div>
        </Box>
      </Modal>
    </>
  );
};
