package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.config.JwtProvider;
import com.gaurang.Food.Ordering.model.PasswordResetToken;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.repository.PasswordResetTokenRepository;
import com.gaurang.Food.Ordering.repository.UserRepository;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String from;
        
    

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {

        String email = jwtProvider.getEmailFromJwtToken(jwt);

        User user = userRepository.findByEmail(email);

        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public void updatePassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public void sendResetPasswordEmail(User user) {
        String token = UUID.randomUUID().toString();
        Date expiryDate = calculateExpiryDate();

        PasswordResetToken passwordResetToken = new PasswordResetToken(token,user,expiryDate);
        passwordResetTokenRepository.save(passwordResetToken);

        sendEmail(user.getEmail(), "Password Reset Mail", "Click the following link to reset your password: http://localhost:3000/account/reset-password?token=" + token);
    }

    private Date calculateExpiryDate() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 10);
        return cal.getTime();
    }

    private void sendEmail(String to, String subject, String message) {
	    SimpleMailMessage mailMessage = new SimpleMailMessage();

	    mailMessage.setTo(to);
	    mailMessage.setSubject(subject);
	    mailMessage.setText(message);

	    javaMailSender.send(mailMessage);
	}
}
