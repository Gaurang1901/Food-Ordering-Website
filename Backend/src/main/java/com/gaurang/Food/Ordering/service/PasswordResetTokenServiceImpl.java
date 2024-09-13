package com.gaurang.Food.Ordering.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurang.Food.Ordering.model.PasswordResetToken;
import com.gaurang.Food.Ordering.repository.PasswordResetTokenRepository;

@Service
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Override
    public void deleteToken(PasswordResetToken token) {
        passwordResetTokenRepository.delete(token);
    }

    @Override
    public PasswordResetToken findByToken(String token) {
        return passwordResetTokenRepository.findByToken(token);
    }
    
}
