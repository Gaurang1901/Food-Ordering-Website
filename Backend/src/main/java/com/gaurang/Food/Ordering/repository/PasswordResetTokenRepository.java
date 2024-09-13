package com.gaurang.Food.Ordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurang.Food.Ordering.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {

    PasswordResetToken findByToken(String token);

    
}
