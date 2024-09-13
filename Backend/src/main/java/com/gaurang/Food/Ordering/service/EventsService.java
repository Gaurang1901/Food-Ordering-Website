package com.gaurang.Food.Ordering.service;

import com.gaurang.Food.Ordering.model.Events;

import java.util.List;

public interface EventsService {

    public Events createEvent(Events event,Long RestaurantId)throws Exception;

    public List<Events> findAllEvents();

    public List<Events> findRestaurantsEvents(Long id);

    public void deleteEvents(Long id)throws Exception;

    public Events findById(Long id)throws Exception;
}
