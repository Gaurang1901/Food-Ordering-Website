package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.model.Order;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.request.OrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest order, User user) throws Exception;

    public Order updateOrder(Long orderId,String orderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUsersOrder(Long userId) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;

    public List<Order> getRestaurantsOrder(Long restaurantId,String orderStatus) throws Exception;




}
