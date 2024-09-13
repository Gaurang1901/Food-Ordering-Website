package com.gaurang.Food.Ordering.repository;

import com.gaurang.Food.Ordering.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {


}
