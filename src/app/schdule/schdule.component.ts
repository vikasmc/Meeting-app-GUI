import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { SchedulerService } from '@/_services/scheduler.service';

@Component({templateUrl: 'schdule.component.html'})
export class SchduleComponent implements OnInit {
    currentUser: User;
    scheduleForm: FormGroup;
    submitted = false;
    loading = false;
    returnUrl: string;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private schedulerService : SchedulerService,
        private alertService: AlertService
    ) {
        // get the user information ferom the auth service
        if (this.authenticationService.currentUserValue) { 
            this.currentUser=this.authenticationService.currentUserValue;
        }
    }

    ngOnInit() {
        this.scheduleForm = this.formBuilder.group({
            roomId: ['', Validators.required],
            userId: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            topicName: ['', Validators.required],
            topicDescription: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // convenience getter for easy access to form fields
    get f() { return this.scheduleForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.scheduleForm.invalid) {
            return;
        }

        this.loading = true;
        this.schedulerService.Schedule(this.scheduleForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Meeting scheduled successfully', true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    
}
