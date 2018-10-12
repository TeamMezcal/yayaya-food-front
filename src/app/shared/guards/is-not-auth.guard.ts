import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isAuthFront = this.sessionService.isAuthenticated();
      console.log(isAuthFront);
      if (!isAuthFront) {
        console.log('not auth front you have to go to login');
        return true;
      } else{
        console.log('you are already logged - staying here');
        this.router.navigate(['mealsList']);
      }
  }
}
