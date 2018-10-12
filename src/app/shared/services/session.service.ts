import { ApiError } from '../models/apiError.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  user: User;
  userSubject: Subject<User> = new Subject();

  apiError: ApiError = new ApiError();

  private static readonly SESSION_API = `${environment.apiUrl}`;
  private static readonly USER = `current-user`;
  private static readonly options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };

  constructor(private http: HttpClient) { 
    const userData = localStorage.getItem(SessionService.USER);
    this.user = JSON.parse(userData);
    this.notifyChanges();
  }

  register(user: User): Observable <User | ApiError>{
    
    return this.http.post<User>(`${SessionService.SESSION_API}/users`, user, SessionService.options)
    .pipe(
      map((user: User) => {
       return user;
      }),
      catchError(this.handleError)
    )
  }

  login(user: User): Observable <User | ApiError>{    
    return this.http.post<User>(`${SessionService.SESSION_API}/sessions`, user, SessionService.options)
    .pipe(
      map((user: User) => {
        this.doLogin(user);
        return user;
      }),
      catchError(this.handleError)
    )
  }

  doLogin(user: User){
    this.user = user;
    localStorage.setItem(SessionService.USER, JSON.stringify(user));
    this.notifyChanges();
  }

  logout(): Observable<void | ApiError>{
    return this.http.delete<void>(`${SessionService.SESSION_API}/sessions`, SessionService.options)
    .pipe(
      map(() => {
        this.doLogOut();
      }),
      catchError(this.handleError)
    )
  }

  doLogOut(){
    console.log('dsa');
    
    this.user = null;
    localStorage.removeItem(SessionService.USER);
    this.notifyChanges();
  }

  isAuthenticated():boolean{
   if(this.user){
     return true;
   } else{
     return false;
   }
  }

  notifyChanges():void{
    this.userSubject.next(this.user);
  }

  onUserChanges(): Observable<User>{
    return this.userSubject.asObservable();
  }


  handleError(error: HttpErrorResponse):Observable<ApiError>{
    const apiError = new ApiError();
    if (error.error instanceof ErrorEvent) {
      apiError.message = 'Something went bad, try again';
    } else{
      apiError.message = error.error.message;
      apiError.errors = error.error.errors;
    }    
    return throwError(apiError);
  }

}