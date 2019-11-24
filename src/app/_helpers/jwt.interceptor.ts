// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
// import { AuthenticationService } from '@/_services';
// import { from as fromPromise, Observable } from 'rxjs';


// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//     constructor(private authenticationService: AuthenticationService) {}
    
//     //   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     //     // add authorization header with jwt token if available

//     //     let currentUser = this.authenticationService.currentUserValue;
        
//     //     if (currentUser && currentUser.token) {
//     //         console.log("test");
//     //         console.log(currentUser);
//     //         console.log(`Bearer ${currentUser.token}`);
//     //         request = request.clone({
//     //             setHeaders: { 
//     //                 Authorization: `Bearer ${currentUser.token}`
//     //             }
//     //         });
//     //     }

//     //     console.log(request);
//     //     return next.handle(request);

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // Clone the request to add the new header
//         // const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer 123') });
    
//         // Pass the cloned request instead of the original request to the next handle
//         // return next.handle(clonedRequest);
//       }
    
// }