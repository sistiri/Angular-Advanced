import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { User } from "src/app/model/user";
import { UserService } from "src/app/service/user.service";
import { getItems, getOneItem, loadItems, LOAD_ITEMS, LOAD_SELECTED_ITEM, ERROR_ITEM, updateItem, LOAD_UPDATED_ITEM } from "./UserActions";


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
      withLatestFrom(this.store$),
      switchMap(([action, store]) => {
        const cache = store.users?.items?.find((item: User) => item.id === action.id);
        return cache ? of(cache) : this.userService.get(action.id)
      }),
      switchMap(user => of({ type: LOAD_SELECTED_ITEM, selected: user })),
      catchError(error => of({ type: ERROR_ITEM, message: error }))
    );
  });

  updateItem$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      // tap( action => console.log(action)),  // Only for supervision 
      ofType(updateItem),
      switchMap(action => this.userService.update(action.item)),
      switchMap(user => of({ type: LOAD_UPDATED_ITEM, item: user })),
      catchError(error => of({ type: ERROR_ITEM, message: error }))
    );
  });
   

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store$: Store<any>,
  ) { }
}
