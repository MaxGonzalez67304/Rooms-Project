package com.example.rooms.service;

import com.example.rooms.model.Room;
import com.example.rooms.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    private static final Logger logger = LoggerFactory.getLogger(RoomService.class);

    // Retrieve a list of reserved rooms
    public List<Room> getReservedRooms() {
        return roomRepository.findByIsReservedTrue();
    }

    // Retrieve a list of non-reserved rooms
    public List<Room> getNonReservedRooms() {
        return roomRepository.findByIsReservedFalse();
    }

    // Retrieve a list of non-reserved rooms by size
    public List<Room> getByRoomSize(String size) {
        return roomRepository.findBySizeAndIsReservedFalse(size);
    }

    // Save or update a room
    public void saveOrUpdateRoom(Room room) {
        roomRepository.save(room);
    }

    // Update the reservation status of a room and set reservation times
    public Optional<Room> updateRoomReservationStatus(Long idRoom, boolean isReserved) {
        Optional<Room> optionalRoom = roomRepository.findById(idRoom);

        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            room.setReserved(isReserved);

            if (isReserved) {
                // Set reservation start and end times
                LocalDateTime currentTime = LocalDateTime.now();
                LocalDateTime endTime = currentTime.plusHours(2);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
                room.setReservation_start_time(currentTime.format(formatter));
                room.setReservation_end_time(endTime.format(formatter));
            }

            roomRepository.save(room);
        }
        return optionalRoom;
    }

    // Automatically update room reservation status when the end time is completed
    @Scheduled(fixedRate = 60000)
    public void autoUpdateRoomReservationStatus() {
        logger.info("Initializing scheduled task...");
        List<Room> allRooms = roomRepository.findAll();

        for (Room room : allRooms) {
            // Parse the end time and release the room if the current time is after the end time
            LocalTime endTime = LocalTime.parse(room.getReservation_end_time(), DateTimeFormatter.ofPattern("HH:mm"));
            if (room.isReserved() && LocalTime.now().isAfter(endTime)) {
                room.setReserved(false);
                roomRepository.save(room);
                logger.info("The room number {} has been released.", room.getIdRoom());
            }
        }
        logger.info("Task completed.");
    }

    // Delete a room by its ID
    public void deleteRoom(Long idRoom) {
        roomRepository.deleteById(idRoom);
    }
}