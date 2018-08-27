import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store, select } from '@ngrx/store';

import { DaffodilAddress } from '@daffodil/core';
import * as fromShipping from '../reducers/index';
import { UpdateShippingInfo, SelectShippingOption } from '../actions/shipping.actions';

@Component({
  selector: '[shipping-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'ShippingContainer'
})
export class ShippingContainer implements OnInit {
  
  shippingInfo$: Observable<DaffodilAddress>;
  selectedShippingOption$: Observable<string>;
  isShippingInfoValid$: Observable<boolean>;
  isShippingOptionSelected$: Observable<boolean>;

  constructor(
    private store: Store<fromShipping.State>
  ) { }

  ngOnInit() {
    this.shippingInfo$ = this.store.pipe(
      select(fromShipping.selectShippingInfoState)
    );
    this.selectedShippingOption$ = this.store.pipe(
      select(fromShipping.selectShippingOptionState)
    );
    this.isShippingInfoValid$ = this.store.pipe(
      select(fromShipping.selectIsShippingInfoValid)
    );
  }

  updateShippingInfo(address: DaffodilAddress) {
    this.store.dispatch(new UpdateShippingInfo(address));
  }

  selectShippingOption(option: string) {
    this.store.dispatch(new SelectShippingOption(option));
  }
}