package com.gaurang.Food.Ordering.request;

import lombok.Data;

@Data
public class ResetPasswordRequest {

    String token;

    String password;
    
}
