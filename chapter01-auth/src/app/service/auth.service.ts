import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = `${this.config.apiUrl}login`
  logoutUrl = `${this.config.apiUrl}logout`
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User |null>(null)
  lastToken: string | null = null

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router,
  ) { }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  logout() {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
    this.router.navigate(['login'])
  }
}
