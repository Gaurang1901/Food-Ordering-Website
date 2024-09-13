package com.gaurang.Food.Ordering.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.gaurang.Food.Ordering.model.PasswordResetToken;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.request.ResetPasswordRequest;
import com.gaurang.Food.Ordering.response.ApiResponse;
import com.gaurang.Food.Ordering.service.PasswordResetTokenService;
import com.gaurang.Food.Ordering.service.UserService;

public class ResetPasswordController {

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse> resetToken(
        @RequestBody ResetPasswordRequest req) throws Exception{
            PasswordResetToken resetToken = passwordResetTokenService.findByToken(req.getToken());

            if(resetToken == null){
                throw new Exception("Reset Token is Missing.....");
            }
            if(resetToken.isExpired()){
                throw new Exception("Reset Token is Expired.....");
            }

            User user = resetToken.getUser();
            userService.updatePassword(user, req.getPassword());

            passwordResetTokenService.deleteToken(resetToken);

            ApiResponse res = new ApiResponse();
            res.setMessage("Password updated Successfully");
            res.setStatus(true);
            return ResponseEntity.ok(res);
        }

        @PostMapping("/reset")
        public ResponseEntity<ApiResponse> resetPassword(@RequestParam("email") String email)throws Exception{
            User user = userService.findUserByEmail(email);
            if(user == null){
                throw new Exception("User not found");
            }
            userService.sendResetPasswordEmail(user);

            ApiResponse res = new ApiResponse();

            res.setMessage("Password Reset Email is Sent");
            res.setStatus(true);
            
            return ResponseEntity.ok(res);
        }

    
}
