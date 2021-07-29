import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { UserService } from "src/app/service/user.service";
import { getItems, loadItems } from "./UserActions";


@Injectable()
export class UserEffect {
  loadItems$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      // tap( action => console.log(action)),  // Only for supervision 
      ofType(getItems),
      switchMap(() => this.userService.get()),
      switchMap(users => of({ type: '[User] load items', items: users })),
      catchError(error => of({ type: '[User] error item', message: error }))
    );
  });
   

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }
}
