package com.example.rooms.service;

import com.example.rooms.model.Room;
import com.example.rooms.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    public List<Room> getReservedRooms() {
        return roomRepository.findByIsReservedTrue();
    }

    public List<Room> getNonReservedRooms() {
        return roomRepository.findByIsReservedFalse();
    }

    public List<Room> getByRoomSize(String size) {
        return roomRepository.findBySizeAndIsReservedFalse(size);
    }

    public void saveOrUpdateRoom(Room room) {
        roomRepository.save(room);
    }

    public Optional<Room> updateRoomReservationStatus(Long idRoom, boolean isReserved) {
        Optional<Room> optionalRoom = roomRepository.findById(idRoom);

        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            room.setReserved(isReserved);

            if (isReserved) {
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

    @Scheduled(fixedRate = 60000)
    public void autoUpdateRoomReservationStatus() {
        List<Room> allRooms = roomRepository.findAll();

        for (Room room : allRooms) {
            LocalDateTime startTime = LocalDateTime.parse(room.getReservation_start_time(), DateTimeFormatter.ofPattern("HH:mm"));
            LocalDateTime endTime = LocalDateTime.parse(room.getReservation_end_time(), DateTimeFormatter.ofPattern("HH:mm"));

            if (!room.isReserved() && LocalDateTime.now().isAfter(startTime)) {
                room.setReserved(true);
                roomRepository.save(room);
            } else if (room.isReserved() && LocalDateTime.now().isAfter(endTime)) {
                room.setReserved(false);
                roomRepository.save(room);
            }
        }
    }

    public void deleteRoom(Long idRoom) {
        roomRepository.deleteById(idRoom);
    }
}
