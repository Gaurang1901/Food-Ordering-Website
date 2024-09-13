package com.gaurang.Food.Ordering.repository;

import com.gaurang.Food.Ordering.model.Cart;
import com.gaurang.Food.Ordering.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    public Cart findByUserId(Long userId);
}
