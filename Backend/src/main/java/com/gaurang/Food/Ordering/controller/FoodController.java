package com.gaurang.Food.Ordering.controller;


import com.gaurang.Food.Ordering.model.Food;
import com.gaurang.Food.Ordering.model.Restaurant;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.request.CreateFoodRequest;
import com.gaurang.Food.Ordering.service.FoodService;
import com.gaurang.Food.Ordering.service.RestaurantService;
import com.gaurang.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String keyword,
                                           @RequestHeader("Authorization")String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);


        List<Food> foods = foodService.searchFood(keyword);
        return new ResponseEntity<>(foods, HttpStatus.CREATED);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(
            @RequestParam boolean vegetarian,
            @RequestParam boolean seasonal,
            @RequestParam boolean nonveg,
            @RequestParam(required = false) String food_category,
            @PathVariable long restaurantId,
            @RequestHeader("Authorization")String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Food> foods = foodService.getRestaurantsFood(restaurantId,vegetarian,seasonal,nonveg,food_category);
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
}
