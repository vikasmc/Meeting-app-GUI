import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Timestamp } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { Meet } from '@/_models/Meet';
import { SchedulerService } from '@/_services/scheduler.service';
import { Schedule } from '@/_models/schedule';
 
interface Country {
    roomName: string;
    topicName: string;
    startTime: string;
    endTime: string;
    presenter: string;
    schduleId: number;
  }
  
  const COUNTRIES: Country[] = [
    {
        roomName: 'Russia',
        topicName: 'Russia',
        startTime: 'Russia',
        endTime: 'Russia',
        presenter: 'Russia',
        schduleId: 1
    },
    {
        roomName: 'Russia',
        topicName: 'Russia',
        startTime: 'Russia',
        endTime: 'Russia',
        presenter: 'Russia',
        schduleId: 1
    },
    {
        roomName: 'Russia',
        topicName: 'Russia',
        startTime: 'Russia',
        endTime: 'Russia',
        presenter: 'Russia',
        schduleId: 1
    }
  ];

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    meets: Meet[] = [];
    countries = COUNTRIES;
    scheduleList: Schedule[];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private schedulerService: SchedulerService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadMeeting();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    loadMeeting() {
        console.log(this.currentUser);
        this.schedulerService.getScheduleForUserName(this.currentUser).subscribe((data: Meet[]) => {
            this.meets=data;
        });
    }

    enrollStudent(id : number) {
        // this.userService.enrollStudent(id).pipe(first()).subscribe(() => {
        //     this.currentUser = user;
        // });
    }

    private loadAllUsers() {
        
        
    }
}