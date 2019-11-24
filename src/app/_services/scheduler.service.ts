import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Schedule } from '@/_models/schedule';
import { Meet } from '@/_models/Meet';
import { scheduleUse } from '@/_models/scheduleUse';
import { searchObj } from '@/_models/searchObj';
import { enrollment } from '@/_models/enrollment';
import { User } from '@/_models';


@Injectable({ providedIn: 'root' })
export class SchedulerService {

    constructor(private http: HttpClient) { }

    Schedule(schedule: Schedule) {
        return this.http.post(`${config.apiUrl}/schedule/register`, schedule);
    }

    getAll() {
        return this.http.get<Schedule[]>(`${config.apiUrl}/schedule`);
    }

    getScheduleForUserName(userName : User) {
        return this.http.post<Meet[]>(`${config.apiUrl}/enrolment/user`,userName);
    }

    getSearchResult(searchRequest : searchObj) {
        return this.http.post<Meet[]>(`${config.apiUrl}/search`,searchRequest);
    }

    enrollStudent(enrolment : enrollment) {
        return this.http.post<User>(`${config.apiUrl}/enrolment/register`,enrolment);
    }

    enrollStudentForUserId(userName : User) {
        return this.http.post<number[]>(`${config.apiUrl}/enrolment/user/scheduleIds`,userName);
    }

}
