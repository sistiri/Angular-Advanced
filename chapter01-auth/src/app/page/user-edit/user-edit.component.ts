import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { getOneItem } from 'src/app/store/user/UserActions';
import { selectOneItem } from 'src/app/store/user/UserReducers';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  // user: User = new User();
  user$: Observable<User> | null = null;
  userID: number = 0;
  serverError = '';

  constructor(
    private userService: UserService,
    private ar: ActivatedRoute,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.userID = parseInt(this.ar.snapshot.params.id, 10);
    this.store.dispatch(getOneItem({ id: this.userID }));
    this.user$ = this.store.pipe(select(selectOneItem));


    // WITHOUT NGRX:
    // this.ar.params.pipe(
    //   switchMap(params => this.userService.get(params.id))
    // )
    //   .pipe(take(1))
    //   .subscribe(
    //     user => {
    //       this.user = (user as User);
    //       this.user.password = '';
    //     }
    //   )
  }

  onSubmit(ngForm: NgForm): void {

    // WITHOUT NGRX:
    // const putObject = Object.assign({ id: this.user.id }, ngForm.value);
    // this.userService.update(putObject)
    //   .toPromise().then(
    //     user => history.back(),
    //     err => {
    //       this.serverError = err.error;
    //       const to = setTimeout(() => {
    //         clearTimeout(to);
    //         this.serverError = '';
    //       }, 3000);
    //     }
    //   );
  }
}

