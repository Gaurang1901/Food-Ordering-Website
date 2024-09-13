package com.gaurang.Food.Ordering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurang.Food.Ordering.model.Events;

public interface EventsRepository extends JpaRepository<Events, Long> {

    public List<Events> findEventsByRestaurantId(Long id);
}
