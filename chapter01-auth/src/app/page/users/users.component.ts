import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';
import { addItem, deleteItem, errorFlush, getItems } from 'src/app/store/user/UserActions';
import { selectError, selectItems } from 'src/app/store/user/UserReducers';

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
  error$ = this.store.pipe(select(selectError)).pipe(
    tap( error => {
      const to = setTimeout( () => {
        clearTimeout(to);
        this.store.dispatch(errorFlush())
      }, 3000);
    })
  );

    constructor(
      private userService: UserService,
      private config: ConfigService,
      private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getItems());
    this.list$ = this.store.pipe( select(selectItems) );
  };

  update(user: User): void {
    this.userService.update(user).toPromise().then(
      userResponse => console.log(userResponse),
      err => console.error(err)
    );
  };

  create(): void {
    const user = new User();
    const today = new Date();
    const time = today.getHours() + "." + today.getMinutes() + "." + today.getSeconds();
    user.first_name = 'New';
    user.last_name = 'User';
    // user.email = `test.${time}@test.com`;
    user.email = `test@test.com`;
    user.password = 'test';
    user.role = 1,
    this.store.dispatch( addItem({item: user}) );
  }

  delete(user: User): void {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.store.dispatch(deleteItem( {item: user}) );
  }
}
