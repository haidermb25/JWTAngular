import { CanActivate } from '@angular/router';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{
  constructor(private service:UserService,private route:Router){}
   canActivate():boolean{
    if(this.service.isLoggedIn()){
      console.log("This is auth guard")
        return true
  }
    else{
      this.route.navigate(['login'])
      return false
    }
    
  };
}

