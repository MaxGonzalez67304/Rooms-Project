import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Room } from 'src/app/model/Room';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  listRooms: Room[] = [];
  formRoom: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  idRoomDelete: number | null = null;
  selectedSize: string = 'All';
  lastReservationDate: Date | null = null;
  loading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.formRoom = new FormGroup({
      idRoom: new FormControl(''),
      name: new FormControl(''),
      size: new FormControl(''),
      isReserved: new FormControl(''),
      reservationDate: new FormControl(''),
    });

    this.listAllRooms();
  }

  listAllRooms() {
    this.apiService.getUnReservedRooms().subscribe(response => {
      if (response) {
        if (this.selectedSize === 'All') {
          this.listRooms = response;
        } else {
          this.listRooms = response.filter((room) => !room.isReserved && room.size === this.selectedSize);
        }
      }
      this.loading = false;
    });
  }

  filterRoomsBySize() {
    this.loading = true;
    if (this.selectedSize === 'All') {
      this.listAllRooms();
    } else {
      this.apiService.getRoomsBySize(this.selectedSize).subscribe((response) => {
        this.listRooms = response.filter((room) => !room.isReserved);
        this.loading = false;
      }
      );
    }
  }

  saveRoom() {
    this.apiService.postRoom(this.formRoom.value).subscribe(response => {
      if (response) {
        this.formRoom.reset();
        this.listAllRooms();
        this.filterRoomsBySize();
      }
    });
  }

  updateRoom() {
    this.apiService.updateRoom(this.formRoom.value).subscribe(response => {
      if (response) {
        this.formRoom.reset();
        this.listAllRooms();
      }
    });
  }

  deleteRoom(idRoom: number) {
    this.idRoomDelete = idRoom;
  }

  newRoom() {
    this.formRoom.reset();
    this.isUpdate = false;
  }

  selectItem(item: any) {
    this.formRoom.controls['idRoom'].setValue(item.idRoom);
    this.formRoom.controls['name'].setValue(item.title);
    this.formRoom.controls['size'].setValue(item.content);
    this.formRoom.controls['isReserved'].setValue(item.category);
    this.formRoom.controls['reservationDate'].setValue(item.category);
    this.lastReservationDate = item.lastReserved;
    this.isUpdate = true;
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

  reserveRoom(idRoom: number) {
    this.apiService.putReservationStatus(idRoom, true).subscribe(response => {
      if (response) {
        this.listAllRooms();
        this.filterRoomsBySize();
      }
    });
  }





}