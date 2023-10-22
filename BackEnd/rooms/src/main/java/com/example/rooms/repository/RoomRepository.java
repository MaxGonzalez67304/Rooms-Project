package com.example.rooms.repository;

import com.example.rooms.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByReservedTrue();
    List<Room> findByReservedFalse();
    List<Room> findBySize(String size);
}
