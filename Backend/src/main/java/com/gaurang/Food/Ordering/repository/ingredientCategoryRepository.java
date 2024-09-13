package com.gaurang.Food.Ordering.repository;

import com.gaurang.Food.Ordering.model.ingredientCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ingredientCategoryRepository extends JpaRepository<ingredientCategory, Long> {

    List<ingredientCategory> findByRestaurantId(long id);
}
