package com.gaurang.Food.Ordering.controller;

import com.gaurang.Food.Ordering.model.CartItem;
import com.gaurang.Food.Ordering.model.Order;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.request.OrderRequest;
import com.gaurang.Food.Ordering.request.addCartItemRequest;
import com.gaurang.Food.Ordering.response.PaymentResponse;
import com.gaurang.Food.Ordering.service.OrderService;
import com.gaurang.Food.Ordering.service.PaymentService;
import com.gaurang.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/order")
    public ResponseEntity<PaymentResponse> createOrder(
            @RequestBody OrderRequest req,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
       Order order = orderService.createOrder(req, user);
       PaymentResponse res = paymentService.createPaymentLink(order);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> order = orderService.getUsersOrder(user.getId());

        return new ResponseEntity<>(order, HttpStatus.CREATED);
}


}
