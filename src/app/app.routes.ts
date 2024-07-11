import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { rememberGuardGuard } from './guards/remember-guard.guard';

export const routes: Routes = [
    {path:"",component:LoginComponent,canActivate:[rememberGuardGuard]},
    {path:'login',component:LoginComponent,canActivate:[rememberGuardGuard]},
    {path:'signup',component:SignupComponent},
    {path:'admin',component:AdminComponent,canActivate:[AuthGuard]}
];
