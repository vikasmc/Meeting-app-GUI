import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { SchedulerService } from '@/_services/scheduler.service';
import { RoomService } from '@/_services/room.service';
import { Room } from '@/_models/room';
import { Meet } from '@/_models/Meet';
import { searchObj } from '@/_models/searchObj';
import { enrollment } from '@/_models/enrollment';
import { scheduleUse } from '@/_models/scheduleUse';

@Component({templateUrl: 'search.component.html'})
export class SearchComponent implements OnInit {
    currentUser: User;
    searchUser: User;
    searchForm: FormGroup;
    submitted = false;
    loading = false;
    returnUrl: string;
    roomNames:String[] =[];
    curRoom: Room[];
    meets: Meet[] = [];
    isClicked: boolean = false;
    selectedRoomName: string;
    searchRequest: searchObj;
    enrollObj: enrollment;
    scheduleList: number[] =[];

    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private schedulerService : SchedulerService,
        private roomService : RoomService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {
        // get the user information ferom the auth service
        if (this.authenticationService.currentUserValue) { 
            this.currentUser=this.authenticationService.currentUserValue;
        }
        this.getScehduleIds();
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            presenter: [''],
            day: [''],
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.onLoadingOfPage();
        this.searchUser = this.currentUser;
    }

    // convenience getter for easy access to form fields
    get f() { return this.searchForm.controls; }

    searchForMeeting() {
        this.searchRequest = this.searchForm.value;
        this.searchRequest.roomName = this.selectedRoomName;
        this.schedulerService.getSearchResult(this.searchRequest).subscribe((data: Meet[]) => {
            console.log(data);
            this.meets=data;
        });
        this.isClicked = true;
    }

    selectChangeHandler (event: any) {
        this.selectedRoomName = event.target.value;
    }

    resetValues() {
        this.isClicked = false;
    }

    onLoadingOfPage() {
        this.roomService.getAll().subscribe(
            (data: Room[]) =>  {
                this.curRoom = data;
                this.curRoom.forEach(roo => {
                    this.roomNames.push(roo.roomName);
                })
            }
          );
    }

    enrollStudent(scheduleId) {
        this.enrollObj = new enrollment;
        this.enrollObj.schedulerId = scheduleId;
        this.enrollObj.userId = this.currentUser.userId;
        console.log(this.enrollObj);
        this.schedulerService.enrollStudent(this.enrollObj).subscribe(
            (data) =>  {
            console.log(data);
            this.searchUser = data;
        },
        error => {
            this.alertService.error('Max enrolment reached or something went wrong');
        });
        this.scheduleList.push(this.enrollObj.schedulerId);
        console.log(this.scheduleList);
    }

    isEnrolled(scheduleId) {
        var isPresent = this.scheduleList.some(function(e){ return e === scheduleId});
        console.log(this.scheduleList);
        console.log(scheduleId);
        console.log(isPresent);
        return !isPresent;
    }

    getScehduleIds(){

        this.schedulerService.enrollStudentForUserId(this.currentUser).subscribe(
            (data) =>  {
                this.scheduleList = data;
            }
        )
    }
    

    
}
