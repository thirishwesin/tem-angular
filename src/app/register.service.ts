import { Injectable } from '@angular/core';

import {BehaviorSubject, } from "rxjs";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  userList: User[] = [];
  constructor() { }
  private userSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.userSubject$.asObservable();

  getUser() {
    return this.userSubject$.asObservable();
  }

  setUser(userList: User[]) {
   this.userSubject$.next(userList);
  }

}
