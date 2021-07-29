import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { UserService } from "src/app/service/user.service";
import { getItems, getOneItem, loadItems, LOAD_ITEMS, LOAD_SELECTED_ITEM, ERROR_ITEM } from "./UserActions";


@Injectable()
export class UserEffect {
  loadItems$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      // tap( action => console.log(action)),  // Only for supervision 
      ofType(getItems),
      switchMap(() => this.userService.get()),
      switchMap(users => of({ type: LOAD_ITEMS, items: users })),
      catchError(error => of({ type: ERROR_ITEM, message: error }))
    );
  });

  getOneItem$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      // tap( action => console.log(action)),  // Only for supervision 
      ofType(getOneItem),
      switchMap(action => this.userService.get(action.id)),
      switchMap(user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
      catchError(error => of({ type: ERROR_ITEM, message: error }))
    );
  });
   

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }
}
