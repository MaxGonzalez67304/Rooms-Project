package com.example.rooms.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

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

    private boolean isReserved;

    @Column(name = "reservation_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reservationDate;
}
