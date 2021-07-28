import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // list$: Observable<User | User[]> = this.userService.get();
  // list$: Observable<User | User[]> | any = (this.userService.get() as unknown as Observable<User[]>);
  list$: Observable<User | User[]> | any = this.userService.get();
  cols: any[] = this.config.userColumns;

    constructor(
      private userService: UserService,
      private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

  update(user: User): void {
    this.userService.update(user).toPromise().then(
      userResponse => console.log(userResponse),
      err => console.error(err)
    );
  }

}
