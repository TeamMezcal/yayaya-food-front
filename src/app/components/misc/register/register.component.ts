import { SessionService } from './../../../shared/services/session.service';
import { ApiError } from './../../../shared/models/apiError.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myError: ApiError;
  user: User = new User();

  @ViewChild('formRegister') registerValidation = FormGroup;

  constructor(private sessionService:SessionService) { }

  ngOnInit() {
  }

  onClickRegisterLogin(){

    // if (this.registerValidation.valid) {
      this.sessionService.register(this.user).subscribe((user: User) => {
        console.log(user);
        
      },
      (error: any) =>{
        this.myError = error;
      }
      )
    // }
    
  }

}
