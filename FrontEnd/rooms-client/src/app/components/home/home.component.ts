import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Room } from 'src/app/model/Room';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  listRooms: Room[] = [];
  formRoom: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  idRoomDelete: number | null = null;
  selectedSize: string = 'All';
  allSizes: string[] = ["All", "Small", "Medium", "Large"];
  lastReservationDate: Date | null = null;
  loading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Initialize the form group for room data
    this.formRoom = new FormGroup({
      idRoom: new FormControl(''),
      name: new FormControl(''),
      size: new FormControl(''),
      isReserved: new FormControl(''),
      reservation_start_time: new FormControl(''),
      reservation_end_time: new FormControl(''),
    });

    // Load the list of rooms
    this.listAllRooms();
  }

  // Function to list all rooms
  listAllRooms() {
    this.apiService.getUnReservedRooms().subscribe(response => {
      if (response) {
        if (this.selectedSize === 'All') {
          this.listRooms = response;
        } else {
          // Filter rooms by size and reservation status
          this.listRooms = response.filter((room) => !room.isReserved && room.size === this.selectedSize);
        }
        this.loading = false;
      }
    });
  }

  // Function to filter rooms by size
  filterRoomsBySize() {
    this.loading = true;

    if (this.selectedSize === 'All') {
      this.listAllRooms();
    } else {
      this.apiService.getRoomsBySize(this.selectedSize).subscribe((response) => {
        this.listRooms = response.filter((room) => !room.isReserved && room.size === this.selectedSize);
        this.loading = false;
      });
    }
  }

  // Function to save a new room
  saveRoom() {
    // Validate the reservation time interval
    const startTime = new Date(`1970-01-01T${this.formRoom.value.reservation_start_time}Z`);
    const endTime = new Date(`1970-01-01T${this.formRoom.value.reservation_end_time}Z`);
    const diffInHours = Math.abs(endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    if (diffInHours !== 2) {
      Swal.fire({
        icon: 'error',
        text: 'El intervalo de tiempo debe ser de 2 horas',
      });
      return;
    }

    // Send a POST request to save the room
    this.apiService.postRoom(this.formRoom.value).subscribe(response => {
      if (response) {
        this.formRoom.reset();
        this.listAllRooms();
        this.filterRoomsBySize();
      }
    });
  }

  // Function to update an existing room
  updateRoom() {
    // Validate the reservation time interval
    const startTime = new Date(`1970-01-01T${this.formRoom.value.reservation_start_time}Z`);
    const endTime = new Date(`1970-01-01T${this.formRoom.value.reservation_end_time}Z`);
    const diffInHours = Math.abs(endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    if (diffInHours !== 2) {
      Swal.fire({
        icon: 'error',
        text: 'The time interval must be 2 hours!',
      });
      return;
    }

    // Send a POST request to update the room
    this.apiService.updateRoom(this.formRoom.value).subscribe(response => {
      if (response) {
        this.formRoom.reset();
        this.listAllRooms();
      }
    });
  }

  // Function to delete a room
  deleteRoom(idRoom: number) {
    this.idRoomDelete = idRoom;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this room!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDeleteRoom();
      }
    });
  }

  // Function to confirm room deletion
  confirmDeleteRoom() {
    if (this.idRoomDelete) {
      this.apiService.deleteRoomById(this.idRoomDelete).subscribe(response => {
        if (!response) {
          this.listAllRooms();
        }
      });
    }
  }

  // Function to reset the room form
  newRoom() {
    this.formRoom.reset();
    this.isUpdate = false;
  }

  // Function to select a room for editing
  selectItem(item: any) {
    this.formRoom.controls['idRoom'].setValue(item.idRoom);
    this.formRoom.controls['name'].setValue(item.name);
    this.formRoom.controls['size'].setValue(item.size);
    this.formRoom.controls['isReserved'].setValue(item.isReserved);
    this.formRoom.controls['reservation_start_time'].setValue(item.reservation_start_time);
    this.formRoom.controls['reservation_end_time'].setValue(item.reservation_end_time);
    this.isUpdate = true;
  }

  // Function to reserve a room
  reservateRoom(idRoom: number) {
    this.apiService.putReservationStatus(idRoom, true).subscribe(response => {
      if (response) {
        this.listAllRooms();
        this.filterRoomsBySize();
      }
    });
  }
}
