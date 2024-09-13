package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.model.Order;
import com.gaurang.Food.Ordering.response.PaymentResponse;
import com.stripe.exception.StripeException;



public interface PaymentService {

    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
