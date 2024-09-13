package com.gaurang.Food.Ordering.controller;


import com.gaurang.Food.Ordering.config.JwtProvider;
import com.gaurang.Food.Ordering.model.Cart;
import com.gaurang.Food.Ordering.model.PasswordResetToken;
import com.gaurang.Food.Ordering.model.USER_ROLE;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.repository.CartRepository;
import com.gaurang.Food.Ordering.repository.UserRepository;
import com.gaurang.Food.Ordering.request.LoginRequest;
import com.gaurang.Food.Ordering.request.ResetPasswordRequest;
import com.gaurang.Food.Ordering.response.ApiResponse;
import com.gaurang.Food.Ordering.response.AuthResponse;
import com.gaurang.Food.Ordering.service.CustomerUserDetailService;
import com.gaurang.Food.Ordering.service.PasswordResetTokenService;
import com.gaurang.Food.Ordering.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomerUserDetailService customerUserDetailService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if (isEmailExist != null) {
            throw new Exception("Email is already used");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullname(user.getFullname());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(createdUser);

        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Registered Successfully");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest){

        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username,password);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login Successfully");
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        String role=authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
        authResponse.setRole(USER_ROLE.valueOf(role));


        return new ResponseEntity<>(authResponse, HttpStatus.OK);

    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails = customerUserDetailService.loadUserByUsername(username);

        if(userDetails == null){
            throw new BadCredentialsException("Invalid username");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }


    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(
        @RequestBody ResetPasswordRequest req)throws Exception{
        PasswordResetToken resetToken = passwordResetTokenService.findByToken(req.getToken());
        if(resetToken == null) {
            throw new Exception("Reset Token is Missing");
        }
        if(resetToken.isExpired()){
            throw new Exception("Reset Token is Expired");
        }
        User user = resetToken.getUser();
        userService.updatePassword(user, req.getPassword());

        passwordResetTokenService.deleteToken(resetToken);

        ApiResponse res = new ApiResponse();
        res.setMessage("Password updated Successfully");
        res.setStatus(true);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/reset-password-request")
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