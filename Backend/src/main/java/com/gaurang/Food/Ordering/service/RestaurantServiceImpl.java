package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.dto.RestaurantDto;
import com.gaurang.Food.Ordering.model.Address;
import com.gaurang.Food.Ordering.model.Restaurant;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.repository.AddressRepository;
import com.gaurang.Food.Ordering.repository.RestaurantRepository;
import com.gaurang.Food.Ordering.repository.UserRepository;
import com.gaurang.Food.Ordering.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userrepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {

        Address address=new Address();
        address.setCity(req.getAddress().getCity());
        address.setCountry(req.getAddress().getCountry());
        address.setFullName(req.getAddress().getFullName());
        address.setPostalCode(req.getAddress().getPostalCode());
        address.setState(req.getAddress().getState());
        address.setStreetAddress(req.getAddress().getStreetAddress());
        Address savedAddress = addressRepository.save(address);

        Restaurant restaurant = new Restaurant();

        restaurant.setAddress(savedAddress);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRequest) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        if (updateRequest.getName() != null) {
            restaurant.setName(updateRequest.getName());
        }
        if (updateRequest.getDescription() != null) {
            restaurant.setDescription(updateRequest.getDescription());
        }
        if (updateRequest.getCuisineType() != null) {
            restaurant.setCuisineType(updateRequest.getCuisineType());
        }
        if (updateRequest.getOpeningHours() != null) {
            restaurant.setOpeningHours(updateRequest.getOpeningHours());
        }
        if (updateRequest.getAddress() != null) {
            restaurant.setAddress(updateRequest.getAddress());
        }
        if (updateRequest.getContactInformation() != null) {
            restaurant.setContactInformation(updateRequest.getContactInformation());
        }
        if (updateRequest.getImages() != null) {
            restaurant.setImages(updateRequest.getImages());
        }
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurant() {

        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long restaurantId) throws Exception {

        Optional<Restaurant> opt = restaurantRepository.findById(restaurantId);
        if(opt.isEmpty()){

            throw new Exception("Restaurant not Found with id "+restaurantId);
        }
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {

        Restaurant restaurant = restaurantRepository.findByOwnerId(userId);

        if(restaurant == null){
            throw new Exception("Restaurant not Found with owner id "+userId);
        }
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavourites(Long restaurantId, User user) throws Exception {

        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDto dto = new RestaurantDto();

        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setName(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavourited = false;
        List<RestaurantDto> favourites = user.getFavourite();
        for(RestaurantDto favourite : favourites){
            if(favourite.getId().equals(restaurantId)){
                isFavourited = true;
                break;
            }
        }

        if(isFavourited){
            favourites.removeIf(favourite -> favourite.getId().equals(restaurantId));
        }
        else{
            favourites.add(dto);
        }
        userrepository.save(user);
        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {

        Restaurant restaurant = findRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());

        return restaurantRepository.save(restaurant);
    }
}
