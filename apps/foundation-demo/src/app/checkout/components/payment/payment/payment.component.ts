import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentInfo } from '@daffodil/core';
import { Store, select } from '@ngrx/store';
import * as fromFoundationCheckout from '../../../reducers';
import { SetShowPaymentForm, ToggleShowPaymentForm } from '../../../actions/payment.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  @Input() paymentInfo: PaymentInfo;
  @Output() updatePaymentInfo: EventEmitter<any> = new EventEmitter();
  showPaymentForm$: Observable<boolean>;

  constructor(
    private store: Store<fromFoundationCheckout.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(
      new SetShowPaymentForm(!this.paymentInfo)
    );

    this.showPaymentForm$ = this.store.pipe(
      select(fromFoundationCheckout.selectShowPaymentForm)
    );
  }

  togglePaymentView() {
    this.store.dispatch(
      new ToggleShowPaymentForm()
    );
  }

  onUpdatePaymentInfo(paymentInfo: PaymentInfo) {
    this.updatePaymentInfo.emit(paymentInfo);
    this.togglePaymentView();
  }
}