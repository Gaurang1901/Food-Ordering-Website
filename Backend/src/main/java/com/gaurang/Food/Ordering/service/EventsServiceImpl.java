package com.gaurang.Food.Ordering.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurang.Food.Ordering.model.Events;
import com.gaurang.Food.Ordering.model.Restaurant;
import com.gaurang.Food.Ordering.repository.EventsRepository;

@Service
public class EventsServiceImpl implements EventsService {

    @Autowired
    private EventsRepository eventsRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public Events createEvent(Events event, Long RestaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(RestaurantId);
        if (restaurant == null) {
            throw new Exception("Restaurant not found");
        }
        Events newEvent = new Events();
        newEvent.setImage(event.getImage());
        newEvent.setName(event.getName());
        newEvent.setRestaurant(restaurant);
        newEvent.setLoation(event.getLoation());
        newEvent.setStartedAt(event.getStartedAt());
        newEvent.setEndsAt(event.getEndsAt());

        return eventsRepository.save(newEvent);

    }

    @Override
    public List<Events> findAllEvents() {
        return eventsRepository.findAll();
    }

    @Override
    public List<Events> findRestaurantsEvents(Long id) {
        return eventsRepository.findEventsByRestaurantId(id);

    }

    @Override
    public void deleteEvents(Long id) throws Exception {
        Events event = findById(id);
        if (event == null) {
            throw new Exception("Event not found");
        }
        eventsRepository.delete(event);
    }

    @Override
    public Events findById(Long id) throws Exception {
        Optional<Events> optionalEvent = eventsRepository.findById(id);
        if (optionalEvent.isPresent()) {
            return optionalEvent.get();
        } else {
            throw new Exception("Event not found");
        }
    }

}
