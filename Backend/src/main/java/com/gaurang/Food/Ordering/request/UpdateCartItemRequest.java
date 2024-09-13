package com.gaurang.Food.Ordering.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCartItemRequest
{

    private Long cartItemId;

    private int quantity;
}
