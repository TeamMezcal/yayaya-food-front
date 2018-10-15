import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { FormGroup } from '@angular/forms';
import { SessionService } from 'src/app/shared/services/session.service';
import { Router } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User = new User();

  @ViewChild('form') loginValidation: FormGroup;
  myError: any;
  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    console.log('componente cargado');
    
  }

  onClickSubmitLogin(){
    if (this.loginValidation.valid) {
      this.sessionService.login(this.user).subscribe((user: User) => {
        console.log('dads');
        
        this.router.navigate(['/meals']);
      },
      (error: any) =>{
        this.myError = error;
      }
      )
    }
    
  }

  ngOnDestroy(){
    console.log('componente login matado login ');
    
  }
}
