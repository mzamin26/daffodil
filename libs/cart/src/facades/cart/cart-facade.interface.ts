import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { DaffStoreFacade } from '@daffodil/core';

import { DaffCart } from '../../models/cart';
import { DaffCartErrors } from '../../reducers/errors/cart-errors.type';
import { DaffCartErrorType } from '../../reducers/errors/cart-error-type.enum';
import { DaffCartOrderResult } from '../../models/cart-order-result';
import { DaffCartItem } from '../../models/cart-item';
import { DaffConfigurableCartItemAttribute } from '../../models/configurable-cart-item';
import { DaffCompositeCartItemOption } from '../../models/composite-cart-item';

export interface DaffCartFacadeInterface<
  T extends DaffCart = DaffCart,
	V extends DaffCartOrderResult = DaffCartOrderResult,
	U extends DaffCartItem = DaffCartItem
> extends DaffStoreFacade<Action> {
  loading$: Observable<boolean>;
  cart$: Observable<T>;
  errors$: Observable<DaffCartErrors>;
  cartErrors$: Observable<DaffCartErrors[DaffCartErrorType.Cart]>;
  itemErrors$: Observable<DaffCartErrors[DaffCartErrorType.Item]>;
  billingAddressErrors$: Observable<DaffCartErrors[DaffCartErrorType.BillingAddress]>;
  shippingAddressErrors$: Observable<DaffCartErrors[DaffCartErrorType.ShippingAddress]>;
  shippingInformationErrors$: Observable<DaffCartErrors[DaffCartErrorType.ShippingInformation]>;
  shippingMethodsErrors$: Observable<DaffCartErrors[DaffCartErrorType.ShippingMethods]>;
  paymentErrors$: Observable<DaffCartErrors[DaffCartErrorType.Payment]>;
  paymentMethodsErrors$: Observable<DaffCartErrors[DaffCartErrorType.PaymentMethods]>;
  couponErrors$: Observable<DaffCartErrors[DaffCartErrorType.Coupon]>;

  id$: Observable<DaffCart['id']>;
  subtotal$: Observable<DaffCart['subtotal']>;
  grandTotal$: Observable<DaffCart['grand_total']>;
  coupons$: Observable<DaffCart['coupons']>;
  items$: Observable<DaffCart['items']>;
  itemDictionary$: Observable<Dictionary<U>>;
  billingAddress$: Observable<DaffCart['billing_address']>;
  shippingAddress$: Observable<DaffCart['shipping_address']>;
  payment$: Observable<DaffCart['payment']>;
  totals$: Observable<DaffCart['totals']>;
  shippingInformation$: Observable<DaffCart['shipping_information']>;
  availableShippingMethods$: Observable<DaffCart['available_shipping_methods']>;
  availablePaymentMethods$: Observable<DaffCart['available_payment_methods']>;

  isCartEmpty$: Observable<boolean>;
  /**
	 * Whether the cart's shipping address equals the billing address.
	 * Returns false if either address is null or undefined.
   */
	isBillingSameAsShipping$: Observable<boolean>;

  hasBillingAddress$: Observable<boolean>;
  hasShippingAddress$: Observable<boolean>;
  hasShippingMethod$: Observable<boolean>;
  hasPaymentMethod$: Observable<boolean>;
  canPlaceOrder$: Observable<boolean>;

  orderResultLoading$: Observable<boolean>;
	orderResultErrors$: Observable<string[]>;
	orderResult$: Observable<V>;
	orderResultId$: Observable<V['orderId']>;
	orderResultCartId$: Observable<V['cartId']>;
  hasOrderResult$: Observable<boolean>;

	getCartItemDiscountedTotal(itemId: string | number): Observable<number>;
	getConfiguredCartItemAttributes(itemId: string | number): Observable<DaffConfigurableCartItemAttribute[]>;
	getCompositeCartItemOptions(itemId: string | number): Observable<DaffCompositeCartItemOption[]>;
}
