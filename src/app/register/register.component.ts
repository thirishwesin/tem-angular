
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { initUser, User } from '../user';
import { cloneDeep, findIndex, keys } from "lodash";
import { Route, Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm!: FormGroup ;
  currentUsers: User[] = [];
  formSubmitted: boolean = false;
  data:any;
  user: User = cloneDeep(initUser);
  
  constructor(private fb: FormBuilder, private router: Router, private service: RegisterService) { }

  ngOnInit(): void {
    console.log('Current User: ',this.currentUsers)
    this.userForm= this.fb.group({

      name: ['', [Validators.required,Validators.pattern("[A-Z].*$"),this.duplicateTeamNameValidator()]],
      phno:['', [Validators.required,Validators.pattern("[0-9]+$"),Validators.minLength(7),Validators.maxLength(10)]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      nrc:['', [Validators.required]]
      
    })

  }

  markFormTouched(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      control.markAsTouched();
      control.markAsPristine();
    })
  }

  markFormUntouched(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      control.markAsUntouched();
    })
  }


  register(){
    this.formSubmitted = true;
    
      console.log('User list before',this.currentUsers);
      this.markFormTouched(this.userForm);
      if (this.userForm.invalid) return;
      
        if(this.data !== null)
        //if(this.currentUsers !== null)

      localStorage.setItem('userList', JSON.stringify(this.currentUsers));
      this.currentUsers.push({ ...this.user, id: String(this.currentUsers.length + 1) })
      console.log('Data: ',this.currentUsers)
      this.data = JSON.parse(localStorage.getItem('userList')|| '');
 
      this.user = cloneDeep(initUser);
      this.markFormUntouched(this.userForm);
      this.router.navigate(['/user']);
      this.service.setUser(this.currentUsers);
      
  }

  duplicateTeamNameValidator(): ValidatorFn {
    console.log("duplicateTeamNameValidator")
    return (control: AbstractControl): ValidationErrors | null => {
      const idx = findIndex(this.currentUsers, user => user.name.trim() === control.value.trim() && this.user.id === '0');
      if (this.currentUsers.length > 0 && idx !== -1) {
        return { duplicateTeamName: true };
      } else return null;
    }
  }

 

}


 
  


