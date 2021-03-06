import {
  createSelector,
  MemoizedSelector,
	MemoizedSelectorWithProps,
  DefaultProjectorFn
} from '@ngrx/store';

import { daffSubtract } from '@daffodil/core';
import { daffComparePersonalAddresses } from '@daffodil/geography';

import { getDaffCartFeatureSelector } from '../cart-feature.selector';
import { DaffCart } from '../../models/cart';
import { DaffCartReducerState, DaffCartReducersState, DaffCartErrorType } from '../../reducers/public_api';
import { DaffCartOrderResult } from '../../models/cart-order-result';
import { DaffCartItem } from '../../models/cart-item';

export interface DaffCartStateMemoizedSelectors<
  T extends DaffCart = DaffCart
> {
	selectCartState: MemoizedSelector<object, DaffCartReducerState<T>>;
	selectCartValue: MemoizedSelector<object, T>;
  selectCartLoading: MemoizedSelector<object, boolean>;

	selectCartErrorsObject: MemoizedSelector<object, DaffCartReducerState<T>['errors']>;
	selectCartErrors: MemoizedSelector<object, string[]>;
	selectBillingAddressErrors: MemoizedSelector<object, string[]>;
	selectShippingAddressErrors: MemoizedSelector<object, string[]>;
	selectShippingInformationErrors: MemoizedSelector<object, string[]>;
	selectShippingMethodsErrors: MemoizedSelector<object, string[]>;
	selectPaymentErrors: MemoizedSelector<object, string[]>;
	selectPaymentMethodsErrors: MemoizedSelector<object, string[]>;
  selectCouponErrors: MemoizedSelector<object, string[]>;

	selectItemErrors: MemoizedSelector<object, string[]>;
	selectCartId: MemoizedSelector<object, T['id']>;
	selectCartSubtotal: MemoizedSelector<object, T['subtotal']>;
	selectCartGrandTotal: MemoizedSelector<object, T['grand_total']>;
	selectCartCoupons: MemoizedSelector<object, T['coupons']>;
	selectCartItems: MemoizedSelector<object, T['items']>;
	selectCartBillingAddress: MemoizedSelector<object, T['billing_address']>;
	selectCartShippingAddress: MemoizedSelector<object, T['shipping_address']>;
	selectCartPayment: MemoizedSelector<object, T['payment']>;
	selectCartTotals: MemoizedSelector<object, T['totals']>;
	selectCartShippingInformation: MemoizedSelector<object, T['shipping_information']>;
	selectCartAvailableShippingMethods: MemoizedSelector<object, T['available_shipping_methods']>;
  selectCartAvailablePaymentMethods: MemoizedSelector<object, T['available_payment_methods']>;

  selectIsCartEmpty: MemoizedSelector<object, boolean>;
  selectCartItemDiscountedRowTotal: MemoizedSelectorWithProps<object, object, number>;
  /**
   * Selects whether the cart's shipping address equals the billing address.
   * Returns false if either address is null or undefined.
   */
	selectIsBillingSameAsShipping: MemoizedSelector<object, boolean>;

  selectHasBillingAddress: MemoizedSelector<object, boolean>;
  selectHasShippingAddress: MemoizedSelector<object, boolean>;
  selectHasShippingMethod: MemoizedSelector<object, boolean>;
  selectHasPaymentMethod: MemoizedSelector<object, boolean>;
  selectCanPlaceOrder: MemoizedSelector<object, boolean, DefaultProjectorFn<boolean>>;
}

const createCartSelectors = <
  T extends DaffCart = DaffCart,
	V extends DaffCartOrderResult = DaffCartOrderResult,
	U extends DaffCartItem = DaffCartItem
>(): DaffCartStateMemoizedSelectors<T> => {
	const selectCartFeatureState = getDaffCartFeatureSelector<T, V, U>().selectCartFeatureState;
	const selectCartState = createSelector(
		selectCartFeatureState,
		(state: DaffCartReducersState<T, V, U>) => state.cart
	);
	const selectCartValue = createSelector(
		selectCartState,
		(state: DaffCartReducerState<T>) => state.cart
	);
	const selectCartLoading = createSelector(
		selectCartState,
		(state: DaffCartReducerState<T>) => state.loading
  );

	const selectCartErrorsObject = createSelector(
		selectCartState,
		(state: DaffCartReducerState<T>) => state.errors
	);
	const selectCartErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.Cart]
	);
	const selectBillingAddressErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.BillingAddress]
	);
	const selectShippingAddressErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.ShippingAddress]
	);
	const selectShippingInformationErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.ShippingInformation]
	);
	const selectShippingMethodsErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.ShippingMethods]
	);
	const selectPaymentErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.Payment]
	);
	const selectPaymentMethodsErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.PaymentMethods]
	);
	const selectItemErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.Item]
  );
  const selectCouponErrors = createSelector(
		selectCartErrorsObject,
		(state: DaffCartReducerState<T>['errors']) => state[DaffCartErrorType.Coupon]
  );

	const selectCartId = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.id
	);
	const selectCartSubtotal = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.subtotal
	);
	const selectCartGrandTotal = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.grand_total
	);
	const selectCartCoupons = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.coupons
	);
	const selectCartItems = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.items
	);
	const selectCartBillingAddress = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.billing_address
	);
	const selectCartShippingAddress = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.shipping_address
	);
	const selectCartPayment = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.payment
	);
	const selectCartTotals = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.totals
	);
	const selectCartShippingInformation = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.shipping_information
	);
	const selectCartAvailableShippingMethods = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.available_shipping_methods
	);
	const selectCartAvailablePaymentMethods = createSelector(
		selectCartValue,
		(state: DaffCartReducerState<T>['cart']) => state.available_payment_methods
  );

	const selectIsCartEmpty = createSelector(
		selectCartValue,
		cart => !cart || !cart.items || cart.items.length === 0
  );
	const selectCartItemDiscountedRowTotal = createSelector(
		selectCartItems,
		(cartItems: DaffCartItem[], props) => {
			const cartItem = cartItems.find(item => item.item_id === props.id)
			return daffSubtract(cartItem.row_total, cartItem.total_discount);
		}
  );
  const selectIsBillingSameAsShipping = createSelector(
    selectCartShippingAddress,
    selectCartBillingAddress,
    (shippingAddress, billingAddress) => daffComparePersonalAddresses(shippingAddress, billingAddress)
  )

  const selectHasBillingAddress = createSelector(
    selectCartBillingAddress,
    billingAddress => !!billingAddress
  );

  const selectHasShippingAddress = createSelector(
    selectCartShippingAddress,
    shippingAddress => !!shippingAddress
  );

  const selectHasShippingMethod = createSelector(
    selectCartShippingInformation,
    shippingMethod => !!shippingMethod
  );

  const selectHasPaymentMethod = createSelector(
    selectCartPayment,
    paymentMethod => !!paymentMethod && paymentMethod.method !== ''
  );

  const selectCanPlaceOrder = createSelector(
    selectIsCartEmpty,
    selectHasBillingAddress,
    selectHasShippingAddress,
    selectHasShippingMethod,
    selectHasPaymentMethod,
    (
      isCartEmpty,
      hasBillingAddress,
      hasShippingAddress,
      hasShippingMethod,
      hasPaymentMethod
    ) => !isCartEmpty
      && hasBillingAddress
      && hasShippingAddress
      && hasShippingMethod
      && hasPaymentMethod
  )

	return {
		selectCartState,
		selectCartValue,
    selectCartLoading,

		selectCartErrorsObject,
		selectCartErrors,
		selectBillingAddressErrors,
		selectShippingAddressErrors,
		selectShippingInformationErrors,
		selectShippingMethodsErrors,
		selectPaymentErrors,
		selectPaymentMethodsErrors,
    selectItemErrors,
    selectCouponErrors,

		selectCartId,
		selectCartSubtotal,
		selectCartGrandTotal,
		selectCartCoupons,
		selectCartItems,
		selectCartBillingAddress,
		selectCartShippingAddress,
		selectCartPayment,
		selectCartTotals,
		selectCartShippingInformation,
		selectCartAvailableShippingMethods,
    selectCartAvailablePaymentMethods,

		selectIsCartEmpty,
    selectCartItemDiscountedRowTotal,
    selectIsBillingSameAsShipping,

    selectHasBillingAddress,
    selectHasShippingAddress,
    selectHasShippingMethod,
    selectHasPaymentMethod,
    selectCanPlaceOrder
	}
}

export const getCartSelectors = (() => {
	let cache;
	return <
    T extends DaffCart = DaffCart,
		V extends DaffCartOrderResult = DaffCartOrderResult,
		U extends DaffCartItem = DaffCartItem
  >(): DaffCartStateMemoizedSelectors<T> => cache = cache
		? cache
		: createCartSelectors<T, V, U>();
})();
