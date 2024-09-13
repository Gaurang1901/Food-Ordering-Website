package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.model.PasswordResetToken;

public interface PasswordResetTokenService {
    
    public void deleteToken(PasswordResetToken token);

    public PasswordResetToken findByToken(String token);
}
