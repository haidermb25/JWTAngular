import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterOutlet,RouterLink,RouterLinkActive} from '@angular/router';
import { UserService } from '../../Services/user.service';
import { signUp } from '../../Models/signUpModel';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup' 
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule,ReactiveFormsModule,NgToastModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  isType:string="password"
  isText:boolean=false
  eyeIcon:string="fa-eye-slash"
  signupForm!:FormGroup;

  //Here is the constructor of the signUp component
  constructor(private _fb:FormBuilder,
              private service:UserService,
              private route:Router,
              private toast:NgToastService){}

  //LifeCycle method
  ngOnInit(): void {
    this.signupForm=this._fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[\\w.-]+@[\\w-]+(\\.[\\w-]{2,3})+$")]],
      userName:['',Validators.required],
      password:['',[Validators.required,Validators.pattern("(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$")]]
    })
  }
  //Here we toggle the password
  togglePassword(){
   this.isText=!this.isText
   this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash"
   this.isText?this.isType="text":this.isType="password"
   console.log(this.eyeIcon,this.isType)
  }

  //Here we register new user
  signUpUser(){
    console.log(this.signupForm.value)
    if(this.signupForm.valid){
      this.service.signUpService(this.signupForm.value)
      .subscribe({
        next:(res=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "New user has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          
          this.route.navigate(['login'])
          this.signupForm.reset()
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
      
    }
  }
}
