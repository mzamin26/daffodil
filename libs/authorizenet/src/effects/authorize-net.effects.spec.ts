import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

import { DaffCartAddress, DaffCartPaymentUpdateWithBilling, DaffCartPaymentUpdateWithBillingSuccess, DaffCartPaymentUpdateWithBillingFailure } from '@daffodil/cart';

import { DaffAuthorizeNetEffects } from './authorize-net.effects';
import { DaffAuthorizeNetUpdatePayment, DaffAuthorizeNetUpdatePaymentSuccess } from '../actions/authorizenet.actions';
import { DaffAuthorizeNetTokenRequest } from '../models/request/authorize-net-token-request';
import { DaffAuthorizeNetUpdatePaymentFailure } from '../actions/authorizenet.actions';
import { daffAuthorizeNetReducers } from '../reducers/authorize-net.reducers';
import { DaffAuthorizeNetService, DaffAuthorizeNetConfigToken, DaffAuthorizeNetConfig } from '../drivers/public_api';
import { MAGENTO_AUTHORIZE_NET_PAYMENT_ID } from '../drivers/magento/authorize-net-payment-id';
import { DaffAuthorizeNetDriver } from '../drivers/interfaces/authorize-net-service.interface';
import { DaffAuthorizeNetPaymentId } from '../drivers/interfaces/authorize-net-payment-id.token';
import { DaffCartAddressFactory, DaffCartFactory } from '@daffodil/cart/testing';

class MockAuthorizeNetDriver implements DaffAuthorizeNetService {
	generateToken(paymentRequest): Observable<any> {
		return null;
	}
}
describe('DaffAuthorizeNetEffects', () => {
  let actions$: Observable<any>;
  let effects: DaffAuthorizeNetEffects;
	const paymentTokenRequest: DaffAuthorizeNetTokenRequest = {
		creditCard: {
			name: 'name',
			cardnumber: '1234123412341234',
			month: 'month',
			year: 'year',
			securitycode: '123'
		}
	};
	let store: MockStore<any>;
	let authorizeNetPaymentService: MockAuthorizeNetDriver;
	const stubConfig: DaffAuthorizeNetConfig = {
		clientKey: 'clientKey',
		apiLoginID: 'apiLoginID',
		production: false
	}
	let stubAddress: DaffCartAddress;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot({
					authorizenet: combineReducers(daffAuthorizeNetReducers)
				}),
			],
      providers: [
        DaffAuthorizeNetEffects,
				provideMockActions(() => actions$),
				{ provide: DaffAuthorizeNetDriver, useClass: MockAuthorizeNetDriver },
				{ provide: DaffAuthorizeNetPaymentId, useValue: MAGENTO_AUTHORIZE_NET_PAYMENT_ID },
				{ provide: DaffAuthorizeNetConfigToken, useValue: stubConfig }
      ]
    });

		stubAddress = new DaffCartAddressFactory().create();
		effects = TestBed.get(DaffAuthorizeNetEffects);
		authorizeNetPaymentService = TestBed.get(DaffAuthorizeNetDriver);
		store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('updatePayment$', () => {

		let expected;
    
    describe('when the call to the AuthorizeNetService is successful', () => {
			
			beforeEach(() => {
				const authorizeNetUpdatePayment = new DaffAuthorizeNetUpdatePayment(paymentTokenRequest, stubAddress);
				spyOn(authorizeNetPaymentService, 'generateToken').and.returnValue(of('token'));
        actions$ = hot('--a', { a: authorizeNetUpdatePayment });
      });
      
      it('should dispatch a DaffCartPaymentUpdateWithBilling action', () => {
        const cartPaymentUpdateWithBillingAction = new DaffCartPaymentUpdateWithBilling({
					method: MAGENTO_AUTHORIZE_NET_PAYMENT_ID,
					payment_info: 'token'
				}, stubAddress);
        expected = cold('--a', { a: cartPaymentUpdateWithBillingAction });
        expect(effects.updatePayment$).toBeObservable(expected);
			});
		});

    describe('when the call to the AuthorizeNetService fails', () => {
      
      beforeEach(() => {
				const authorizeNetUpdatePayment = new DaffAuthorizeNetUpdatePayment(paymentTokenRequest, stubAddress);
        const error = 'Failed to retrieve the token';
				const response = cold('#', {}, error);
				spyOn(authorizeNetPaymentService, 'generateToken').and.returnValue(response);
				
        const authorizeNetUpdatePaymentFailureAction = new DaffAuthorizeNetUpdatePaymentFailure(error);
        actions$ = hot('--a', { a: authorizeNetUpdatePayment });
        expected = cold('--b', { b: authorizeNetUpdatePaymentFailureAction });
      });
      
      it('should dispatch an AuthorizeNetUpdatePaymentFailure action', () => {
        expect(effects.updatePayment$).toBeObservable(expected);
      });
		});
	});

	describe('updatePaymentSuccessSubstream$', () => {
		
		it('should dispatch DaffAuthorizeNetUpdatePaymentSuccess when the cart payment method has been successfully updated', () => {
			const stubCart = new DaffCartFactory().create();
			const authorizeNetUpdatePayment = new DaffAuthorizeNetUpdatePayment(paymentTokenRequest, stubAddress);
			const cartPaymentUpdateWithBillingSuccess = new DaffCartPaymentUpdateWithBillingSuccess(stubCart);
			const authorizeNetPaymentUpdateSuccess = new DaffAuthorizeNetUpdatePaymentSuccess();
			actions$ = hot('--a--b', { a: authorizeNetUpdatePayment, b: cartPaymentUpdateWithBillingSuccess });

			const expected = cold('-----c', { c: authorizeNetPaymentUpdateSuccess });
			expect(effects.updatePaymentSuccessSubstream$).toBeObservable(expected);
		});
	});

	describe('updatePaymentFailureSubstream$', () => {
		
		it('should dispatch DaffAuthorizeNetUpdatePaymentFailure when the cart payment method has failed to update', () => {
			const authorizeNetUpdatePayment = new DaffAuthorizeNetUpdatePayment(paymentTokenRequest, stubAddress);
			const cartPaymentUpdateWithBillingFailure = new DaffCartPaymentUpdateWithBillingFailure('error');
			const authorizeNetPaymentUpdateFailure = new DaffAuthorizeNetUpdatePaymentFailure('The payment method has failed to update the cart.');
			actions$ = hot('--ab', { a: authorizeNetUpdatePayment, b: cartPaymentUpdateWithBillingFailure });

			const expected = cold('---c', { c: authorizeNetPaymentUpdateFailure });
			expect(effects.updatePaymentFailureSubstream$).toBeObservable(expected);
		});
	});
});
