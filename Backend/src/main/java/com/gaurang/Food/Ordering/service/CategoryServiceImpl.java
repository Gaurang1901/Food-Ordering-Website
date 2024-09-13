package com.gaurang.Food.Ordering.service;


import com.gaurang.Food.Ordering.model.Category;
import com.gaurang.Food.Ordering.model.Restaurant;
import com.gaurang.Food.Ordering.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createCategory(String name, Long userId) throws Exception {

        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        Category category = new Category();

        category.setName(name);
        category.setRestaurant(restaurant);

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {
//        Restaurant restaurant = restaurantService.getRestaurantByUserId(id);
        return categoryRepository.findByRestaurantId(id);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {

        Optional<Category> category = categoryRepository.findById(id);
        if(category.isEmpty()){
            throw new Exception("Category not found");
        }
        return category.get();
    }
}
