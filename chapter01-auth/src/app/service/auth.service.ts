import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${this.config.apiUrl}login`;
  logoutUrl = `${this.config.apiUrl}logout`;
  storageName = 'currentUser';
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  lastToken: string = '';

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {
    // Load cached userdata from the localstorage.
    const storedUser = localStorage.getItem(this.storageName);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // login(loginData: User): Observable<{ accessToken: string }> {
    login(loginData: User):Observable<User | User [] | null> {
      return this.http.post<{ user: User, accessToken: string }>(
      this.loginUrl,
      loginData
      ).pipe(
        switchMap(response => {
        if (response.user && response.accessToken) {
          this.lastToken = response.accessToken;
          response.user.token = response.accessToken;
          this.currentUserSubject.next(response.user);
          localStorage.currentUser = JSON.stringify(response.user);
          // return response.user;
          return this.userService.query(`email=${loginData.email}`);
        }
        return of(null);
      }))
      .pipe(
        tap(user => {
          if (!user) {
            localStorage.removeItem(this.storageName);
            // this.currentUserSubject.next(null); //  with this Users server response is 401
          } else {
            // user.token = this.lastToken;
            (user as User[])[0].token = this.lastToken;
            localStorage.currentUser = JSON.stringify(user as User[][0]);
            this.currentUserSubject.next((user as User[])[0]);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.storageName);
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
