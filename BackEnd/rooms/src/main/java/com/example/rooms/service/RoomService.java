package com.example.rooms.service;

import com.example.rooms.model.Room;
import com.example.rooms.repository.RoomRepository;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class RoomService {
    @Autowired
    RoomRepository roomRepository;

    public void getReservedRooms() {
        roomRepository.findByReservedTrue();
    }

    public void getNonReservedRooms() {
        roomRepository.findByReservedFalse();
    }

    public void saveOrUpdateRoom(Room room) {
        if (room.getIdRoom() == null || room.getIdRoom() == 0) {
            room.setReservationDate(new Date());
        }
        roomRepository.save(room);
    }

    public Optional<Room> updateRoomReservedStatus(Long idRoom, boolean isReserved) {
        Optional<Room> optionalRoom = roomRepository.findById(idRoom);

        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            room.setReserved(isReserved);
            roomRepository.save(room);
        }
        return optionalRoom;
    }

    public void deleteRoom(Long idRoom) {
        roomRepository.deleteById(idRoom);
    }
}
