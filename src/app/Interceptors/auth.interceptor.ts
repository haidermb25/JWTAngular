import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { UserService } from '../Services/user.service';
import Swal from 'sweetalert2';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const service = inject(UserService);
  const routes=inject(Router)
  const token =service.getStorage();
 console.log("This is my interceptor")
  if (token != null) {
      req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status===401){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Token expired! Please Login again",
          });
         routes.navigate(['login'])
         service.signOut()
        }
      }
      return throwError(()=>{console.log("Some other error")})
    })
  );
};
