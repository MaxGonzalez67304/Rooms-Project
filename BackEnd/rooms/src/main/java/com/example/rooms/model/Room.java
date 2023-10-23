package com.example.rooms.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "board_room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRoom;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "size", length = 10, nullable = false)
    private String size;

    @Column(name = "is_reserved")
    private boolean isReserved;

    @Column(name = "reservation_end_time", length = 50, nullable = false)
    private String reservation_end_time;

    @Column(name = "reservation_start_time", length = 50, nullable = false)
    private String reservation_start_time;
}
