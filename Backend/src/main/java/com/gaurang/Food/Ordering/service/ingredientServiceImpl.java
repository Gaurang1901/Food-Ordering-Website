package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.model.ingredientCategory;
import com.gaurang.Food.Ordering.model.ingredientsItem;
import com.gaurang.Food.Ordering.model.Restaurant;
import com.gaurang.Food.Ordering.repository.ingredientCategoryRepository;
import com.gaurang.Food.Ordering.repository.ingredientItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ingredientServiceImpl implements ingredientsService{

    @Autowired
    private ingredientItemRepository ingredientItemRepository;

    @Autowired
    private ingredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public ingredientCategory createingredientCategory(String name, Long restaurantId) throws Exception {

        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        ingredientCategory category = new ingredientCategory();
        category.setName(name);
        category.setRestaurant(restaurant);

        return ingredientCategoryRepository.save(category);
    }

    @Override
    public ingredientCategory findingredientCategoryById(Long id) throws Exception {

        Optional<ingredientCategory> opt = ingredientCategoryRepository.findById(id);

        if(opt.isEmpty()){
            throw new Exception("Ingredient Category not found");
        }
        return opt.get();
    }

    @Override
    public List<ingredientCategory> findingredientCategoryByRestaurantId(Long id) throws Exception {

        restaurantService.findRestaurantById(id);
        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public ingredientsItem createingredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {

        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        ingredientCategory category = findingredientCategoryById(categoryId);
        ingredientsItem item = new ingredientsItem();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(category);

        ingredientsItem ingredients = ingredientItemRepository.save(item);
        category.getIngredients().add(ingredients);
        return ingredients;
    }

    @Override
    public List<ingredientsItem> findRestaurantsingredient(Long restaurantId) {

        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }


    @Override
    public ingredientsItem updateStock(Long id) throws Exception {

        Optional<ingredientsItem> opt = ingredientItemRepository.findById(id);
        if(opt.isEmpty()){
            throw new Exception("Ingredient Item not found");
        }
        ingredientsItem item = opt.get();
        item.setInStock(!item.isInStock());
        return ingredientItemRepository.save(item);
    }
}
