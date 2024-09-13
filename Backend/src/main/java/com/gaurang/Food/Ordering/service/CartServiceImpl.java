package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.model.Cart;
import com.gaurang.Food.Ordering.model.CartItem;
import com.gaurang.Food.Ordering.model.Food;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.repository.CartItemRepository;
import com.gaurang.Food.Ordering.repository.CartRepository;
import com.gaurang.Food.Ordering.repository.FoodRepository;
import com.gaurang.Food.Ordering.request.addCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodRepository foodRepository;

    // @Autowired
    // private FoodService foodService;


    @Override
    public CartItem addItemToCart(addCartItemRequest req, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Optional<Food> menuItem=foodRepository.findById(req.getFoodId());
        if(menuItem.isEmpty()) {
            throw new Exception("Menu Item not exist with id "+req.getFoodId());
        }

        Cart cart = findCartByUserId(user.getId());

        for (CartItem cartItem : cart.getItem()) {
            if (cartItem.getFood().equals(menuItem.get())) {

                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                return updateCartItemQuantity(cartItem.getId(),newQuantity);
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setFood(menuItem.get());
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setCart(cart);
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity()*menuItem.get().getPrice());

        CartItem savedItem=cartItemRepository.save(newCartItem);
        cart.getItem().add(savedItem);
        cartRepository.save(cart);

        return savedItem;
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {

        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()){
            throw new Exception("CartItem not found");
        }

        CartItem cartItem = cartItemOptional.get();
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(cartItem.getFood().getPrice()*quantity);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public Cart removeCartItemFromCart(Long cartItemId, String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartRepository.findByCustomerId(user.getId());
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);

        if(cartItemOptional.isEmpty()){
            throw new Exception("CartItem not found");
        }

        CartItem cartItem = cartItemOptional.get();
        cart.getItem().remove(cartItem);

        return cartRepository.save(cart);
    }

    @Override
    public Long calculateCartTotal(Cart cart) throws Exception {

        Long total = 0L;
        for(CartItem cartItem:cart.getItem()){
            total += cartItem.getFood().getPrice()*cartItem.getQuantity();
        }

        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {

        Optional<Cart> cartOptional = cartRepository.findById(id);
        if(cartOptional.isEmpty()){
            throw new Exception("Cart not found with id: " + id);
        }
        return cartOptional.get();
    }

    @Override
    public Cart findCartByUserId(Long userid) throws Exception {

//        User user = userService.findUserByJwtToken(jwt);
        Cart cart =  cartRepository.findByCustomerId(userid);
        cart.setTotal(calculateCartTotal(cart));
        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {

//        User user = userService.findUserByJwtToken(jwt);
        Cart cart = findCartById(userId);
        cart.getItem().clear();
        return cartRepository.save(cart);
    }
}
