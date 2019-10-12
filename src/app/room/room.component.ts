import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { RoomService } from '@/_services/room.service';

@Component({templateUrl: 'room.component.html'})
export class RoomComponent implements OnInit {
    currentUser: User;
    roomForm: FormGroup;
    submitted = false;
    loading = false;
    returnUrl: string;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private roomService : RoomService,
        private alertService: AlertService
    ) {
        // get the user information ferom the auth service
        if (this.authenticationService.currentUserValue) { 
            this.currentUser=this.authenticationService.currentUserValue;
        }
    }

    ngOnInit() {
        this.roomForm = this.formBuilder.group({
            roomName: ['', Validators.required],
            roomLocation: ['', Validators.required],
            roomSize: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // convenience getter for easy access to form fields
    get f() { return this.roomForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.roomForm.invalid) {
            return;
        }

        this.loading = true;
        this.roomService.AddRoom(this.roomForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('New Room Has been Added successfully', true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    
}
