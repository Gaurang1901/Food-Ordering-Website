package com.gaurang.Food.Ordering.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ingredientRequest {

    private String name;

    private Long categoryId;

    private Long restaurantId;
}
