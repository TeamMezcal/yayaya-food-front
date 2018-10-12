import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class IsauthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isAuthFront = this.sessionService.isAuthenticated();
      console.log(isAuthFront);
      if (isAuthFront) {        
        return true;
      } else{
        console.log('not auth front');
        this.router.navigate(['login']);
      }

    }
  }

