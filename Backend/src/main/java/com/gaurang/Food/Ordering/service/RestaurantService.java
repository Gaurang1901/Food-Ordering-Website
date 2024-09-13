package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.dto.RestaurantDto;
import com.gaurang.Food.Ordering.model.Restaurant;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {

    public Restaurant createRestaurant(CreateRestaurantRequest req, User user);

    public Restaurant updateRestaurant(Long restaurantId,CreateRestaurantRequest updateRestaurant) throws Exception;

    public void deleteRestaurant(Long restaurantId) throws Exception;

    public List<Restaurant> getAllRestaurant() throws Exception;

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long restaurantId) throws Exception;

    public Restaurant getRestaurantByUserId(Long userId) throws Exception;

    public RestaurantDto addToFavourites(Long restaurantId,User user) throws Exception;

    public Restaurant updateRestaurantStatus(Long id)throws Exception;
}
