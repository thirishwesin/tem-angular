import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, } from "rxjs";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  userList: User[] = [];
  constructor() { }
  private userSubject$ = new BehaviorSubject<User[]>(this.userList);

  setUser(user: User): void {
    this.userList.push(user);
    this.userSubject$.next(this.userList);
  }

  getUser(): Observable<User[]> {
    return this.userSubject$;
  }


}