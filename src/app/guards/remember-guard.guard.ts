import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

export const rememberGuardGuard: CanActivateFn = (route, state) => {
  const service=inject(UserService)
  const route1=inject(Router)
  if(service.getRememberMeUserName()==true&&service.getRememberMePassword()==true){
    route1.navigate(['admin'])
    return false;
  }
  else{
    return true;
  }
};
