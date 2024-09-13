package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.model.*;
import com.gaurang.Food.Ordering.repository.*;
import com.gaurang.Food.Ordering.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CartService cartService;

    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {

        Address shippAddress = order.getDeliveryAddress();
        Address savedAddress = addressRepository.save(shippAddress);

        Restaurant restaurant = restaurantService.findRestaurantById(order.getRestaurantId());

        Order createdOrder = new Order();
        createdOrder.setRestaurant(restaurant);
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");

        Cart cart = cartService.findCartByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItem()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(cartItem.getIngredients());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }
        Long totalPrice = cartService.calculateCartTotal(cart);
        createdOrder.setItems(orderItems);
        createdOrder.setTotalAmount(totalPrice);

        Order savedOrder = orderRepository.save(createdOrder);
        restaurant.getOrders().add(savedOrder);
        return createdOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order = findOrderById(orderId);

        if (orderStatus.equals("OUT_FOR_DELIVERY") ||
                orderStatus.equals("DELIVERED") ||
                orderStatus.equals("COMPLETED") ||
                orderStatus.equals("PENDING")) {

            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        throw new Exception("Invalid order status");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {

        Order order = findOrderById(orderId);
        if (order == null) {
            throw new Exception("Order not found with the id " + orderId);
        }
        orderRepository.deleteById(orderId);

    }

    @Override
    public List<Order> getUsersOrder(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isEmpty()) {
            throw new Exception("Order not found");
        }
        return optionalOrder.get();
    }

    @Override
    public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception {

        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        if (orderStatus != null) {
            orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus))
                    .collect(Collectors.toList());
        }

        return orders;
    }
}
