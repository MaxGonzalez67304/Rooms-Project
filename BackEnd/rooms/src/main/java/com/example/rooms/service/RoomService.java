package com.example.rooms.service;

import com.example.rooms.model.Room;
import com.example.rooms.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void deleteRoom(Long idRoom) {
        roomRepository.deleteById(idRoom);
    }
}
