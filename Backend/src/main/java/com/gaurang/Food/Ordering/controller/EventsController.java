package com.gaurang.Food.Ordering.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaurang.Food.Ordering.model.Events;
import com.gaurang.Food.Ordering.response.ApiResponse;
import com.gaurang.Food.Ordering.service.EventsService;

@RestController
@RequestMapping("/api")
public class EventsController {

    @Autowired
    public EventsService eventsService;

    @PostMapping("/admin/events/restaurant/{restaurantId}")
    public ResponseEntity<Events> createEvent(
        @RequestBody Events events,
        @PathVariable Long restaurantId)throws Exception{
            Events newEvent = eventsService.createEvent(events, restaurantId);

            return new ResponseEntity<>(newEvent,HttpStatus.ACCEPTED);
        }
    
    @GetMapping("/events")
    public ResponseEntity<List<Events>> getAllEvents()throws Exception{
        List<Events> events = eventsService.findAllEvents();
        return new ResponseEntity<>(events,HttpStatus.OK);

    }

    @GetMapping("/admin/events/restaurant/{restaurantId}")
    public ResponseEntity<List<Events>> getRestaurantEvents(
        @PathVariable Long restaurantId)throws Exception{
            List<Events> events = eventsService.findRestaurantsEvents(restaurantId);
        return new ResponseEntity<>(events,HttpStatus.OK);
    }

    @DeleteMapping("/admin/events/{id}")
    public ResponseEntity<ApiResponse> deleteEvent(
        @PathVariable Long id)throws Exception{
            eventsService.deleteEvents(id);
            return new ResponseEntity<>(new ApiResponse("Event deleted successfully",true),HttpStatus.OK);
        }

    
    
    
}
