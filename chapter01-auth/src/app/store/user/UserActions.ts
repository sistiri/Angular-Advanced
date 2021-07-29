import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user";

// Constant name for actions.
export const GET_ITEMS = '[User] get items';
export const GET_ONE_ITEM = '[User] get item';
export const LOAD_ITEMS = '[User] load items';
export const LOAD_SELECTED_ITEM = '[User] load selected';
export const ERROR_ITEM = '[User] error item';

//Actions.
export const getItems = createAction(GET_ITEMS);
export const getOneItem = createAction(
  GET_ONE_ITEM,
  props<{ id: string | number }>()
)

export const loadItems = createAction(
  LOAD_ITEMS,
  props<{ items: User[] }>()
);

export const loadSelectedItem = createAction(
  LOAD_SELECTED_ITEM,
  props<{ selected: User }>()
);

export const errorItem = createAction(
  ERROR_ITEM,
  props<{ message: string }>()
);