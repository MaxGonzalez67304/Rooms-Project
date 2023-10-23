package com.example.rooms.repository;

import com.example.rooms.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    // Find and return a list of rooms that are reserved
    List<Room> findByIsReservedTrue();

    // Find and return a list of rooms that are not reserved
    List<Room> findByIsReservedFalse();

    // Find and return a list of rooms by size that are not reserved
    List<Room> findBySizeAndIsReservedFalse(String size);
}
