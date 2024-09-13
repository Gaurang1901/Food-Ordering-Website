package com.gaurang.Food.Ordering.service;


import com.gaurang.Food.Ordering.model.Cart;
import com.gaurang.Food.Ordering.model.CartItem;
import com.gaurang.Food.Ordering.request.addCartItemRequest;

public interface CartService {

    public CartItem addItemToCart(addCartItemRequest req, String jwt) throws Exception;

    public CartItem updateCartItemQuantity(Long cartItemId, int quantity)throws Exception;

    public Cart removeCartItemFromCart(Long cartItemId,String jwt)throws Exception;

    public Long calculateCartTotal(Cart cart)throws Exception;

    public Cart findCartById(Long id)throws Exception;

    public Cart findCartByUserId(Long userId)throws Exception;

    public Cart clearCart(Long userId)throws Exception;


}
