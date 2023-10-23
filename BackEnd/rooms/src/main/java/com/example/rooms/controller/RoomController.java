package com.example.rooms.controller;

import com.example.rooms.model.Room;
import com.example.rooms.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1")
public class RoomController {
    @Autowired
    private RoomService roomService;

    // Get a list of reserved rooms
    @GetMapping("/room/findReserved")
    public List<Room> getReservedRooms() {
        return roomService.getReservedRooms();
    }

    // Get a list of non-reserved rooms
    @GetMapping("/room/findNonReserved")
    public List<Room> getNonReservedRooms() {
        return roomService.getNonReservedRooms();
    }

    // Get a list of rooms by size that are not reserved
    @GetMapping("/room/size/{size}")
    public List<Room> getRoomsBySize(@PathVariable String size) {
        return roomService.getByRoomSize(size);
    }

    // Update room reservation status by ID
    @PutMapping("/room/setReservation/{idRoom}")
    public ResponseEntity<Room> updateRoomReservationStatus(@PathVariable Long idRoom, @RequestBody boolean isReserved) {
        Optional<Room> optionalRoom = roomService.updateRoomReservationStatus(idRoom, isReserved);

        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            return ResponseEntity.ok(room);
        } else {
            // Return 404 Not Found if the room with the given ID is not found
            return ResponseEntity.notFound().build();
        }
    }

    // Create or update a room
    @PostMapping("/room/create")
    public Room saveOrUpdateRoom(@RequestBody Room room) {
        roomService.saveOrUpdateRoom(room);
        return room;
    }

    // Delete a room by ID
    @DeleteMapping("/room/delete/{idRoom}")
    public void deleteRoom(@PathVariable("idRoom") Long idRoom) {
        roomService.deleteRoom(idRoom);
    }
}
