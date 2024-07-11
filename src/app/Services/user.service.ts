import { login } from './../Models/loginModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUp } from '../Models/signUpModel';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "https://localhost:7168/api/Values/";
  payload: any = [];
  userName!:string
  password!:string
  constructor(private http: HttpClient, private userStore: UserStoreService) {
    this.payload = this.decodeToken();
  }

  loginService(user: string): Observable<login> {
    return this.http.post<login>(`${this.baseUrl}Authenticate`, user);
  }

  signUpService(user: signUp) {
    return this.http.post<signUp>(`${this.baseUrl}Register`, user);
  }

  setStorage(token: string) {
    localStorage.setItem('token', token);
    this.updateUserStore();
  }

  getStorage() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut() {
    localStorage.clear();
    this.userStore.setFullNameFromStore('');
    this.userStore.setRoleFromStore('');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getStorage();
    if (token) {
      return jwtHelper.decodeToken(token);
    }
    return null;
  }

  updateUserStore() {
    this.payload = this.decodeToken();
    if (this.payload) {
      this.userStore.setFullNameFromStore(this.payload.unique_name);
      this.userStore.setRoleFromStore(this.payload.role);
    }
  }

  getFullNameFromPayload() {
    if (this.payload) {
      return this.payload.unique_name;
    }
    return '';
  }

  getRoleFromPayload() {
    if (this.payload) {
      return this.payload.role;
    }
    return '';
  }

  rememberMeStorage(userName:string,password:string){
    localStorage.setItem('userName',userName)
    localStorage.setItem('password',password)
  }
  getRememberMeUserName(){
   this.userName=localStorage.getItem('userName')!
    return !!this.userName
  }
  getRememberMePassword(){
    this.password=localStorage.getItem('password')!
     return !!this.password
   }
}
