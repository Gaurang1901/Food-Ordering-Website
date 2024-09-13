package com.gaurang.Food.Ordering.request;


import com.gaurang.Food.Ordering.model.Category;
import com.gaurang.Food.Ordering.model.ingredientsItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateFoodRequest {

    private String name;

    private String description;

    private Long price;

    private Category category;

    private List<String> images;

    private Long restaurantId;

    private boolean vegetarian;

    private boolean seasonal;

    private List<ingredientsItem> ingredients;

}
