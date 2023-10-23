import { Component } from '@angular/core';
import { Room } from 'src/app/model/Room';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent {
  reservedRooms: Room[] = []; // An array to store the list of reserved rooms.

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.listReservedRooms(); // Call the function to fetch and display reserved rooms.
  }

  /**
   * Fetch and list the reserved rooms from the API.
   */
  listReservedRooms() {
    this.apiService.getReservedRooms().subscribe(response => {
      if (response) {
        this.reservedRooms = response; // Update the reservedRooms array with the fetched data.
      }
    });
  }

  /**
   * Update the reservation status of a room and refresh the list of reserved rooms.
   * @param idRoom - The ID of the room to update.
   */
  updateReservationStatus(idRoom: number) {
    this.apiService.putReservationStatus(idRoom, false).subscribe(response => {
      if (response) {
        this.listReservedRooms(); // Refresh the list of reserved rooms after updating a reservation status.
      }
    });
  }
}
