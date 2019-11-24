﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { Role } from './_models/role';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    ngOnInit() {
        document.body.className = "selector";
      }
    
    ngOnDestroy(){
        document.body.className="";
      }

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    get isAdmin() {
        return this.currentUser && this.currentUser.type === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}