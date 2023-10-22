import { Component } from '@angular/core';
import { Room } from 'src/app/model/Room';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent {
  reservedRooms: Room[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.listReservedRooms();
  }

  listReservedRooms() {
    this.apiService.getReservedRooms().subscribe(response => {
      if (response) {
        this.reservedRooms = response;
      }
    });
  }

  updateReservationStatus(idRoom: number) {
    this.apiService.putReservationStatus(idRoom, false).subscribe(response => {
      if (response) {
        this.listReservedRooms();
      }
    });
  }

  formatLastReserved(lastReserved: string | Date | undefined): string {
    if (!lastReserved) {
      return 'N/A';
    }

    if (typeof lastReserved === 'string') {
      lastReserved = new Date(lastReserved);
    }

    return lastReserved.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'medium' });
  }

}
