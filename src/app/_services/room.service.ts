import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Room } from '@/_models/room';


@Injectable({ providedIn: 'root' })
export class RoomService {

    constructor(private http: HttpClient) { }

    AddRoom(room: Room) {
        return this.http.post(`${config.apiUrl}/rooms/register`, room);
    }

    getAll() {
        return this.http.get<Room[]>(`${config.apiUrl}/rooms`);
    }

}
