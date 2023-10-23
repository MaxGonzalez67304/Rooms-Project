export class Room {
    idRoom: number = 0; // The unique identifier for the room.
    name: string = ""; // The name of the room.
    size: string = ""; // The size category of the room (e.g., Small, Medium, Large).
    isReserved: boolean = false; // Indicates whether the room is currently reserved or not.
    reservation_start_time: string = ""; // The start time of the room reservation.
    reservation_end_time: string = ""; // The end time of the room reservation.
  }
