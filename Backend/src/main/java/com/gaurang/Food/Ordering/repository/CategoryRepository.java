package com.gaurang.Food.Ordering.repository;


import com.gaurang.Food.Ordering.model.Category;
// import com.gaurang.Food.Ordering.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    public List<Category> findByRestaurantId(Long id);
}
