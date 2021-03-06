import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, take, map, catchError } from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';

import {
	DaffCart,
	DaffCartDriver,
	DaffCartServiceInterface,
	DaffCartStorageService,
	DaffCartReducersState
} from '@daffodil/cart';

import {
	ResolveCartSuccess,
	CartResolverActionTypes,
	ResolveCartFailure,
} from '../actions/cart-resolver.actions';
import { daffCartSelectors } from '../../selectors/cart-selector';

@Injectable()
export class CartResolverEffects {
	constructor(
		private actions$: Actions,
		private store: Store<DaffCartReducersState>,
		private cartStorage: DaffCartStorageService,
		@Inject(DaffCartDriver) private driver: DaffCartServiceInterface,
	) {}

	@Effect()
	onResolveCart$: Observable<Action> = this.actions$.pipe(
		ofType(CartResolverActionTypes.ResolveCartAction),
		switchMap(() => {
			return this.selectStoreCart().pipe(
				take(1),
				switchMap(cart => {
					if (cart) {
						return of(new ResolveCartSuccess(cart));
					} else {
						return this.getCartHandler();
					}
				}),
			);
		}),
	);

	selectStoreCart(): Observable<DaffCart> {
		return this.store.pipe(select(daffCartSelectors.selectCartValue));
	}

	private getCartHandler(): Observable<Action> {
		return this.driver.get(this.cartStorage.getCartId()).pipe(
			map(resp => new ResolveCartSuccess(resp)),
			catchError(error => {
				return of(new ResolveCartFailure(null));
			}),
		);
	}
}
