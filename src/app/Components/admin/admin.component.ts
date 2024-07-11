import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { AuthGuard } from '../../guards/auth-guard.guard';
import { UserService } from '../../Services/user.service';
import { ApiService } from '../../Services/api.service';
import { signUp } from '../../Models/signUpModel';
import { CommonModule } from '@angular/common';
import {user} from '../../Models/apiModel'
import { UserStoreService } from '../../Services/user-store.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private service:UserService,
              private api:ApiService ,
              private routes:Router,
              private userstore:UserStoreService){}
  userLists:user[]=[]
  fullName!:any
  role!:string
  //Call after constructor and load the list of the users
  ngOnInit(): void {
    this.api.getUsers().subscribe({
      next:(res)=>{
        this.userLists=res
      },
      error:(err)=>{
        console.log("Error: ",err)
      }
    })
         //Here I get the name of the user
    this.userstore.getFullNameFromStore()
    .subscribe((val)=>{
      const name=this.service.getFullNameFromPayload()
      this.fullName=val||name
    })

    //Here I get the role of the user
    this.userstore.getRoleFromStore()
    .subscribe((val=>{
      const role1=this.service.getRoleFromPayload()
      this.role=role1||val
    }))
  }
  //LogOut from the application
  logOut(){
    this.service.signOut()
    this.routes.navigate(['login'])
  }
}
