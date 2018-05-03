import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { CartService } from '../services/cart.service';
import { 
  CartActionTypes, 
  CartLoad, 
  CartLoadSuccess, 
  CartLoadFailure } from '../actions/cart.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from 'rxjs/scheduler/Action';

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private cartService: CartService) {}

  @Effect()
  load$ : Observable<any> = this.actions$.pipe(
    ofType(CartActionTypes.CartLoadAction),
    switchMap((action: CartLoad) =>
      this.cartService.get()
        .pipe(
          map((resp) => {
            return new CartLoadSuccess(resp);
          }),
          catchError(error => {
            return of(new CartLoadFailure("Failed to load cart"));
          })
        )
    )
  )
}