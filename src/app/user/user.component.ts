import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { RegisterService } from '../register.service';
import { initUser, User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: User[] = [];
  user: User = cloneDeep(initUser);
  constructor(private service:RegisterService) { }

  ngOnInit(): void {

    this.service.getUser().subscribe((userList: User[]) => {

    this.userList = userList;
    console.log('user list in user com..',this.userList)
    });
 
  }

  deleteUser(id:any) {
    let index = this.userList.findIndex(username => username.id === id);
    this.userList.splice(index, 1);
  }
}

