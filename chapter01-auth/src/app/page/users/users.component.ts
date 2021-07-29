import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';
import { getItems } from 'src/app/store/user/UserActions';
import { selectItems } from 'src/app/store/user/UserReducers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // list$: Observable<User | User[]> = this.userService.get(); // Original version - did not work
  // list$: Observable<User | User[]> | any = (this.userService.get() as unknown as Observable<User[]>); //
  // list$: Observable<User | User[]> | any = this.userService.get(); // Works, but replaced to use NGRX
  list$: Observable<User | User[]> | any = new Observable<User | User[]>();
  cols: any[] = this.config.userColumns;

    constructor(
      private userService: UserService,
      private config: ConfigService,
      private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getItems());
    this.list$ = this.store.pipe(select(selectItems));
  }

  update(user: User): void {
    this.userService.update(user).toPromise().then(
      userResponse => console.log(userResponse),
      err => console.error(err)
    );
  }

}
