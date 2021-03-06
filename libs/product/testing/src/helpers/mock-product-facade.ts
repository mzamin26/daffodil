import { BehaviorSubject } from 'rxjs';

import { DaffProduct, DaffProductFacadeInterface } from '@daffodil/product';

export class MockDaffProductFacade implements DaffProductFacadeInterface {
	loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	/**
	 * @deprecated use getProduct instead.
	 */
	product$: BehaviorSubject<DaffProduct> = new BehaviorSubject(null);
	getProduct(id: string): BehaviorSubject<DaffProduct> {
		return new BehaviorSubject(null);
	}
	dispatch(action) {};
}
