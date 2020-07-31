import { DaffAuthorizeNetReducerState } from './authorize-net-reducer.interface';
import { DaffAuthorizeNetActions, DaffAuthorizeNetActionTypes } from '../../actions/authorizenet.actions';
import { DaffAuthorizeNetTokenRequest } from '../../models/request/authorize-net-token-request';
import { AcceptType } from '../../models/acceptJs/accept';

export const initialState: DaffAuthorizeNetReducerState = {
	isAcceptLoaded: false,
	error: null,
	loading: false
}

declare var Accept: AcceptType;

export function daffAuthorizeNetReducer <T extends DaffAuthorizeNetTokenRequest>
	(state: DaffAuthorizeNetReducerState = initialState, action: DaffAuthorizeNetActions<T>): DaffAuthorizeNetReducerState {
  switch (action.type) {
		case DaffAuthorizeNetActionTypes.UpdatePaymentAction:
			return {
				...state,
				loading: true
			}
    case DaffAuthorizeNetActionTypes.UpdatePaymentSuccessAction:
      return { 
				...state,
				loading: false,
				error: null
			};
		case DaffAuthorizeNetActionTypes.UpdatePaymentFailureAction:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case DaffAuthorizeNetActionTypes.AcceptJsLoadedAction:
			return {
				...state,
				isAcceptLoaded: true
			}
    default:
      return state;
  }
}
