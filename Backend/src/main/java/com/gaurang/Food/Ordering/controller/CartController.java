package com.gaurang.Food.Ordering.controller;

import com.gaurang.Food.Ordering.model.Cart;
import com.gaurang.Food.Ordering.model.CartItem;
import com.gaurang.Food.Ordering.model.User;
import com.gaurang.Food.Ordering.request.UpdateCartItemRequest;
import com.gaurang.Food.Ordering.request.addCartItemRequest;
import com.gaurang.Food.Ordering.service.CartService;
import com.gaurang.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

@PutMapping("/cart/add")
public ResponseEntity<CartItem> addItemToCart(@RequestBody addCartItemRequest req,
                                              @RequestHeader("Authorization") String jwt) throws  Exception {
    CartItem cart = cartService.addItemToCart(req, jwt);
    return ResponseEntity.ok(cart);

}

    @PutMapping("/cart-item/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(
            @RequestBody UpdateCartItemRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {
        CartItem cart = cartService.updateCartItemQuantity(req.getCartItemId(), req.getQuantity());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/cart-item/{id}/remove")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long id,
                                                   @RequestHeader("Authorization") String jwt) throws  Exception {

        Cart cart = cartService.removeCartItemFromCart(id, jwt);
        return ResponseEntity.ok(cart);

    }

    @GetMapping("/cart/total")
    public ResponseEntity<Double> calculateCartTotals(@RequestParam Long cartId,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {


        User user = userService.findUserByJwtToken(jwt);

        Cart cart =cartService.findCartByUserId(user.getId());
        double total = cartService.calculateCartTotal(cart);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> findUserCart(
            @RequestHeader("Authorization") String jwt) throws  Exception {
        User user=userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findCartByUserId(user.getId());
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserByJwtToken(jwt);
        Cart cart = cartService.clearCart(user.getId());
        return ResponseEntity.ok(cart);
    }

}
