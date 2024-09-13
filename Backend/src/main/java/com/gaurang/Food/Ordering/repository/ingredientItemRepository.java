package com.gaurang.Food.Ordering.repository;

import com.gaurang.Food.Ordering.model.ingredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ingredientItemRepository extends JpaRepository<ingredientsItem,Long> {

    List<ingredientsItem> findByRestaurantId(Long id);
}
