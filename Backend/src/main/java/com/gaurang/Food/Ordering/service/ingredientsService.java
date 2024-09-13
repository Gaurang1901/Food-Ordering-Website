package com.gaurang.Food.Ordering.service;


import com.gaurang.Food.Ordering.model.ingredientCategory;
import com.gaurang.Food.Ordering.model.ingredientsItem;

import java.util.List;

public interface ingredientsService {

    public ingredientCategory createingredientCategory(String name,Long restaurantId) throws Exception;

    public ingredientCategory findingredientCategoryById(Long id) throws Exception;

    public List<ingredientCategory> findingredientCategoryByRestaurantId(Long id) throws Exception;

    public ingredientsItem createingredientItem(Long restaurantId,String ingredientName,Long categoryId) throws Exception;

    public List<ingredientsItem> findRestaurantsingredient(Long restaurantId) ;

    public ingredientsItem updateStock(Long id) throws Exception;


}
