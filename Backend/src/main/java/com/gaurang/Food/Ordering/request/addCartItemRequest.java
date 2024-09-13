package com.gaurang.Food.Ordering.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class addCartItemRequest {

    private Long foodId;

    private int quantity;

    private List<String> ingredients;
}
