import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Room } from '@/_models/room';


@Injectable({ providedIn: 'root' })
export class RoomService {

    constructor(private http: HttpClient) { }

    AddRoom(room: Room) {

        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', `Bearer `+ token);
        // let headerDict = {
        //     headers: new HttpHeaders({
        //         'Content-Type':  'application/json',
        //         'Authorization':'Bearer  '+ token
        //       })
        //   }
        //   console.log("toke is "+ token);

        return this.http.post(`${config.apiUrl}/rooms/register`, room)
    }

    getAll() {
        return this.http.get<Room[]>(`${config.apiUrl}/rooms`);
    }

}
