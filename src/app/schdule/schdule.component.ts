import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { SchedulerService } from '@/_services/scheduler.service';
import { RoomService } from '@/_services/room.service';
import { Room } from '@/_models/room';
import { Schedule } from '@/_models/schedule';

@Component({templateUrl: 'schdule.component.html'})
export class SchduleComponent implements OnInit {
    currentUser: User;
    scheduleForm: FormGroup;
    submitted = false;
    loading = false;
    returnUrl: string;
    roomNames: string[] =[];
    curRoom: Room[];
    selectedRoomName: string = "Default";
    scheduleObject: Schedule;

    City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private schedulerService : SchedulerService,
        private roomService : RoomService,
        private alertService: AlertService
    ) {
        // get the user information ferom the auth service
        if (this.authenticationService.currentUserValue) { 
            this.currentUser=this.authenticationService.currentUserValue;
        }
    }

    ngOnInit() {
        this.scheduleForm = this.formBuilder.group({
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            topicName: ['', Validators.required],
            topicDescription: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.onLoadingOfPage();
    }

    // convenience getter for easy access to form fields
    get f() { return this.scheduleForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.scheduleForm.invalid) {
            // if(this.selectedRoomName == "Default") {
            return;
        }

        this.loading = true;
        this.scheduleObject = this.scheduleForm.value;
        this.scheduleObject.userId = this.currentUser.userId;
        this.scheduleObject.roomName = this.selectedRoomName;
        this.schedulerService.Schedule(this.scheduleObject)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Meeting scheduled successfully', true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error('Conflicts occurred with timimg Or Something went wrong');
                    this.loading = false;
                });
    }

    onLoadingOfPage() {
        this.roomService.getAll().subscribe(
            (data: Room[]) =>  {
                let i = 1;
                data.forEach(roo => {                    
                    if(i == 1) {
                        this.selectedRoomName = roo.roomName;
                    }
                    i=2;
                    this.roomNames.push(roo.roomName);
                })
            }
          );
    }

    selectChangeHandler (event: any) {
        this.selectedRoomName = event.target.value;
      }
}
