import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import React from 'react'
import { Navigate } from 'react-router-dom'

export const PasswordChangeSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center  ">
      <div className="lg:w-[50vw] mt-20">
        <Alert severity="success">Password Updated!</Alert>
        <div className="flex justify-center mt-5">
          <Button
            onClick={() => Navigate("/account/login")}
            fullWidth
            variant="outlined"
            sx={{ padding: ".8rem 0rem" }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
