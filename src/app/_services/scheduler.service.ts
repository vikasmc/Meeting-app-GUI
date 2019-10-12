import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Schedule } from '@/_models/schedule';


@Injectable({ providedIn: 'root' })
export class SchedulerService {

    constructor(private http: HttpClient) { }

    Schedule(schedule: Schedule) {
        return this.http.post(`${config.apiUrl}/schedule/register`, schedule);
    }

    getAll() {
        return this.http.get<Schedule[]>(`${config.apiUrl}/schedule`);
    }

}
