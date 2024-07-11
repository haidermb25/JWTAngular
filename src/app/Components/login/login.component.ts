import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { RouterOutlet,RouterLink,RouterLinkActive} from '@angular/router';
import { UserService } from '../../Services/user.service';
import { login } from '../../Models/loginModel';
import { Router } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup'
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
            RouterOutlet,
            RouterLink,
            RouterLinkActive,
            ReactiveFormsModule,
            CommonModule,
            NgToastModule,
            FormsModule
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isType:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  checkBox:boolean=false
  loginForm!:FormGroup
  //Constructor of the component
  constructor(private fb:FormBuilder,private service:UserService,private route:Router){}

  //Life Cycle method
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  //Here we toggle the password
  togglePassword(){
   this.isText=!this.isText
   this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
   this.isText?this.isType="text":this.isType="password"
  }


  //Here we get the login data
  loginUser(){
    if(this.loginForm.valid){
      this.service.loginService(this.loginForm.value).subscribe({
        next:(res=>{
          this.service.setStorage(res.token?res.token:"")
          this.route.navigate(['admin'])
          if(this.checkBox){
            const username=this.loginForm.controls['username'].value
            const password=this.loginForm.controls['password'].value
            this.service.rememberMeStorage(username,password)
            }
        }),
        error:(err=>{
          console.log(err)
          alert("There is some error")
        })
      })
    }
  }
}
