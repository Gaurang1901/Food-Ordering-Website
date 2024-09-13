package com.gaurang.Food.Ordering.repository;

import com.gaurang.Food.Ordering.model.Address;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByStreetAddress(String streetAddress);

}
