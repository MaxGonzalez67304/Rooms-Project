import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../model/Room';
import {
  _URL_GET_UNRESERVED, _URL_GET_RESERVED, _URL_GET_BY_SIZE,
  _URL_PUT_RESERVATION, _URL_POST_ROOM, _URL_DELETE_ROOM
} from '../config/config';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieve a list of unreserved rooms from the API.
   * @returns An Observable containing an array of Room objects.
   */
  getUnReservedRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(_URL_GET_UNRESERVED);
  }

  /**
   * Retrieve a list of reserved rooms from the API.
   * @returns An Observable containing an array of Room objects.
   */
  getReservedRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(_URL_GET_RESERVED);
  }

  /**
   * Retrieve a list of rooms filtered by size from the API.
   * @param size - The desired room size for filtering.
   * @returns An Observable containing an array of Room objects.
   */
  getRoomsBySize(size: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(_URL_GET_BY_SIZE + "/" + size);
  }

  /**
   * Update the reservation status of a room in the API.
   * @param idRoom - The ID of the room to update.
   * @param isReserved - The new reservation status for the room.
   * @returns An Observable containing the updated Room object.
   */
  putReservationStatus(idRoom: number, isReserved: boolean): Observable<Room> {
    return this.httpClient.put<Room>(_URL_PUT_RESERVATION + "/" + idRoom, isReserved);
  }

  /**
   * Create a new room in the API.
   * @param room - The Room object to create.
   * @returns An Observable containing the created Room object.
   */
  postRoom(room: Room): Observable<Room> {
    console.log("objeto", room);
    return this.httpClient.post<Room>(_URL_POST_ROOM, room);
  }

  /**
   * Update an existing room in the API.
   * @param request - The updated room data.
   * @returns An Observable containing the updated room data.
   */
  updateRoom(request: any): Observable<any> {
    const updatedRoom: Room = {
      ...request
    };
    return this.httpClient.post<any>(_URL_POST_ROOM, updatedRoom);
  }

  /**
   * Delete a room by its ID in the API.
   * @param idRoom - The ID of the room to delete.
   * @returns An Observable indicating the result of the deletion.
   */
  deleteRoomById(idRoom: number): Observable<any> {
    return this.httpClient.delete<any>(_URL_DELETE_ROOM + "/" + idRoom);
  }
}
