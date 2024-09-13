package com.gaurang.Food.Ordering.request;

import com.gaurang.Food.Ordering.model.Address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    private Long restaurantId;

    private Address deliveryAddress;


}
