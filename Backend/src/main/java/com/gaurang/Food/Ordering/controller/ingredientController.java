package com.gaurang.Food.Ordering.controller;

import com.gaurang.Food.Ordering.model.ingredientCategory;
import com.gaurang.Food.Ordering.model.ingredientsItem;
import com.gaurang.Food.Ordering.request.ingredientRequest;
import com.gaurang.Food.Ordering.request.IngredientCategoryRequest;
import com.gaurang.Food.Ordering.service.ingredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredient")
public class ingredientController {

    @Autowired
    private ingredientsService ingredientsService;

    @PostMapping("/category")
    public ResponseEntity<ingredientCategory> createingredientCategory(
            @RequestBody IngredientCategoryRequest req) throws Exception {
        ingredientCategory item = ingredientsService.createingredientCategory(req.getName(), req.getRestaurantId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity<ingredientsItem> createingredientItem(
            @RequestBody ingredientRequest req) throws Exception {
        ingredientsItem item = ingredientsService.createingredientItem(req.getRestaurantId(),req.getName(),req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<ingredientsItem> updateingredientStock(
            @PathVariable Long id) throws Exception {
        ingredientsItem item = ingredientsService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<ingredientsItem>> getRestaurantingredient(
            @PathVariable Long id) throws Exception {
        List<ingredientsItem> item = ingredientsService.findRestaurantsingredient(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<List<ingredientCategory>> getRestaurantingredientCategory(
            @PathVariable Long id) throws Exception {
        List<ingredientCategory> item = ingredientsService.findingredientCategoryByRestaurantId(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

}
