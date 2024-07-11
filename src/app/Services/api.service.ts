import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signUp } from '../Models/signUpModel';
import {user} from '../Models/apiModel'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //Get the list of the users
  getUsers():Observable<user[]>{
    return this.http.get<user[]>('https://localhost:7168/api/Values/users');
  }
}
