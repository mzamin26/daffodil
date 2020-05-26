import { Component, OnInit } from '@angular/core';
import { DaffCart, DaffCartFacade, DaffCartItemAdd, DaffCartCreate, DaffCartItemInputType } from '@daffodil/cart';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class DemoCartViewComponent implements OnInit {

	cart$: Observable<DaffCart>;
	loading$: Observable<boolean>;

	constructor(private cartFacade: DaffCartFacade<DaffCart>) {}

	ngOnInit() {
		// this.cartFacade.dispatch(new DaffCartCreate());
		this.cart$ = this.cartFacade.cart$;
		this.loading$ = this.cartFacade.loading$;
	}

	addToCart() {
		this.cartFacade.dispatch(new DaffCartItemAdd({ type: DaffCartItemInputType.Simple, productId: '24-MB01', qty: 1}))
	}

	addSecondToCart() {
		this.cartFacade.dispatch(new DaffCartItemAdd(
			{ 
				type: DaffCartItemInputType.Composite, 
				productId: '24-WG080', 
				qty: 1, 
				options: [
					{
            id: "1",
            quantity: 1,
            value: "2"
          },
          {
            id: 2,
            quantity: 2,
            value: 4
          },
          {
            id: 3,
            quantity: 1,
            value: "7"
          },
          {
            id: 4,
            quantity: 1,
            value: "8"
          }
				]
			}
		))
	}

	addThirdToCart() {
		this.cartFacade.dispatch(new DaffCartItemAdd({ type: DaffCartItemInputType.Simple, productId: '24-MB03', qty: 1}))
	}
}
