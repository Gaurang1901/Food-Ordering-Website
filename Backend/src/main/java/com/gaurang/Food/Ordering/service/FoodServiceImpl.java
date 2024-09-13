package com.gaurang.Food.Ordering.service;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurang.Food.Ordering.model.Category;
import com.gaurang.Food.Ordering.model.Food;
import com.gaurang.Food.Ordering.model.Restaurant;
import com.gaurang.Food.Ordering.repository.FoodRepository;
import com.gaurang.Food.Ordering.request.CreateFoodRequest;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {

        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setPrice(req.getPrice());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setIngredients(req.getIngredients());
        food.setSeasonal(req.isSeasonal());
        food.setVegetarian(req.isVegetarian());
        food.setCreationDate(new Date());

        Food savedfood = foodRepository.save(food);
        restaurant.getFoods().add(savedfood);
        return savedfood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {

        Food food = findFoodById(foodId);
        food.setRestaurant(null);
        // foodRepository.save(food);
        foodRepository.delete(food);
    }

    @Override
    public List<Food> getRestaurantsFood(
        Long restaurantId, 
        boolean isVegetarian, 
        boolean isNonveg, 
        boolean isSeasonal, 
        String foodCategory) {
        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        return foods.stream()
                .filter(food -> {
                    boolean matches = true;
                    if (isVegetarian) {
                        matches = food.isVegetarian();
                    }
                    if (isNonveg) {
                        matches = matches && !food.isVegetarian();
                    }
                    if (isSeasonal) {
                        matches = matches && food.isSeasonal();
                    }
                    if (foodCategory != null && !foodCategory.isEmpty()) {
                        matches = matches && food.getFoodCategory().getName().equalsIgnoreCase(foodCategory);
                    }
                    return matches;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Food> searchFood(String keyword) {
        List<Food> items=new ArrayList<>();
		
		if(keyword!="") {
			System.out.println("keyword -- "+keyword);
			items=foodRepository.searchFood(keyword);
		}
		
		return items;
    }

    @Override
    public Food findFoodById(Long foodId) throws Exception {
        Optional<Food> food = foodRepository.findById(foodId);
        if(food.isEmpty()){
            throw new Exception("Food not Exist");
        }
        return food.get();
    }

    @Override
    public Food updateAvailabilityStatus(Long foodId) throws Exception {

        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }
}
