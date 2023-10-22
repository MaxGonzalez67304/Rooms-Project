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

  getUnReservedRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(_URL_GET_UNRESERVED);
  }

  getReservedRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(_URL_GET_RESERVED);
  }

  getRoomsBySize(size: string): Observable<Room[]> {
    return this.httpClient.get<Room[]>(_URL_GET_BY_SIZE + "/" + size);
  }

  putReservationStatus(idRoom: number, isReserved: boolean): Observable<Room> {
    return this.httpClient.put<Room>(_URL_PUT_RESERVATION + "/" + idRoom, isReserved);
  }

  postRoom(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(_URL_POST_ROOM, room);
  }

  updateRoom(request: any): Observable<any> {
    const updatedRoom: Room = {
      ...request,
      lastReserved: new Date()
    };

    return this.httpClient.post<any>(_URL_POST_ROOM, updatedRoom);
  }

  deleteRoomById(idRoom: number): Observable<any> {
    return this.httpClient.delete<any>(_URL_DELETE_ROOM + "/" + idRoom);
  }
}
