package com.gaurang.Food.Ordering.controller;

import com.gaurang.Food.Ordering.model.Order;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.service.OrderService;
import com.gaurang.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(
            @PathVariable Long id,
            @RequestParam(required = false) String orderStatus,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        List<Order> order = orderService.getRestaurantsOrder(id,orderStatus);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/order/restaurant/{restaurantId}")
    public ResponseEntity<List<Order>> getAllRestaurantOrders(
    		@PathVariable Long restaurantId,
    		@RequestParam(required = false) String order_status) throws Exception {
    	
    		List<Order> orders = orderService.
    				getRestaurantsOrder(restaurantId,order_status);
    		
//    		System.out.println("ORDER STATUS----- "+orderStatus);
    		return ResponseEntity.ok(orders);
    }

    @PutMapping("/order/{id}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(
        @PathVariable Long id,
        @PathVariable String orderStatus,
        @RequestHeader("Authorization") String jwt) throws Exception{
            User user = userService.findUserByJwtToken(jwt);
            Order order = orderService.updateOrder(id, orderStatus);
            return new ResponseEntity<>(HttpStatus.OK);
        }
}
