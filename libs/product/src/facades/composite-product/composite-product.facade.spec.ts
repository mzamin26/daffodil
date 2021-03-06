import { TestBed } from '@angular/core/testing';
import { MockStore } from '@ngrx/store/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

import { 
	DaffCompositeProduct, 
	DaffProductLoadSuccess,
	daffProductReducers,
	DaffProductReducersState
} from '@daffodil/product';
import { DaffCompositeProductFactory } from '@daffodil/product/testing';

import { DaffCompositeProductFacade } from './composite-product.facade';

describe('DaffCompositeProductFacade', () => {
  let store: MockStore<Partial<DaffProductReducersState>>;
	let facade: DaffCompositeProductFacade;
	let stubCompositeProduct: DaffCompositeProduct;
	

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot({
          product: combineReducers(daffProductReducers),
        })
      ],
      providers: [
        DaffCompositeProductFacade,
      ]
		})

    store = TestBed.get(Store);
		facade = TestBed.get(DaffCompositeProductFacade);
		stubCompositeProduct = new DaffCompositeProductFactory().create();
		stubCompositeProduct.items[0].required = true;
		stubCompositeProduct.items[1].required = false;
		stubCompositeProduct.items[0].options[0].price = 10;
		stubCompositeProduct.items[0].options[1].price = 20;
		stubCompositeProduct.items[1].options[0].price = 30;
		stubCompositeProduct.items[1].options[1].price = 40;
		store.dispatch(new DaffProductLoadSuccess(stubCompositeProduct));
	});

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should be able to dispatch an action to the store', () => {
    spyOn(store, 'dispatch');
    const action = {type: 'SOME_TYPE'};

    facade.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  describe('getMinPossiblePrice', () => {

    it('should return the minimum price possible for the product', () => {
			const expected = cold('a', { a: 
				stubCompositeProduct.price + 
				stubCompositeProduct.items[0].options[0].price
			});
	
			expect(facade.getMinPossiblePrice(stubCompositeProduct.id)).toBeObservable(expected);
		});
  });

  describe('getMaxPossiblePrice', () => {

    it('should return the maximum price possible for the product', () => {
			const expected = cold('a', { a: 
				stubCompositeProduct.price + 
				stubCompositeProduct.items[0].options[1].price +
				stubCompositeProduct.items[1].options[1].price
			});
	
			expect(facade.getMaxPossiblePrice(stubCompositeProduct.id)).toBeObservable(expected);
		});
  });

  describe('possiblyHasPriceRange', () => {

    it('should return whether the product could have a price range', () => {
			const expected = cold('a', { a: true });
	
			expect(facade.possiblyHasPriceRange(stubCompositeProduct.id)).toBeObservable(expected);
		});
	});

  describe('getMinPrice', () => {

    it('should return the minimum price for the product', () => {
			const expected = cold('a', { a: 
				stubCompositeProduct.price + 
				stubCompositeProduct.items[0].options[0].price +
				stubCompositeProduct.items[1].options[0].price
			});
	
			expect(facade.getMinPrice(stubCompositeProduct.id)).toBeObservable(expected);
		});
  });

  describe('getMaxPrice', () => {

    it('should return the maximum price for the product', () => {
			const expected = cold('a', { a: 
				stubCompositeProduct.price + 
				stubCompositeProduct.items[0].options[0].price +
				stubCompositeProduct.items[1].options[0].price
			});
	
			expect(facade.getMaxPrice(stubCompositeProduct.id)).toBeObservable(expected);
		});
  });

  describe('hasPriceRange', () => {

    it('should return whether the product currently has a price range', () => {
			const expected = cold('a', { a: false });
	
			expect(facade.hasPriceRange(stubCompositeProduct.id)).toBeObservable(expected);
		});
	});

  describe('getPrice', () => {

    it('should return the price of the product', () => {
			const expected = cold('a', { a: 
				stubCompositeProduct.price + 
				stubCompositeProduct.items[0].options[0].price +
				stubCompositeProduct.items[1].options[0].price 
			});
	
			expect(facade.getPrice(stubCompositeProduct.id)).toBeObservable(expected);
		});
  });

  describe('getPrice', () => {

    it('should return the price of the product', () => {
			const expected = cold('a', { a: 
				stubCompositeProduct.price + 
				stubCompositeProduct.items[0].options[0].price +
				stubCompositeProduct.items[1].options[0].price 
			});
	
			expect(facade.getPrice(stubCompositeProduct.id)).toBeObservable(expected);
		});
  });

  describe('getDiscountAmount', () => {

    it('should return the total discount amount for a composite product', () => {
			const expected = cold('a', { a: 
				stubCompositeProduct.discount.amount
			});
	
			expect(facade.getDiscountAmount(stubCompositeProduct.id)).toBeObservable(expected);
		});
  });

  describe('getDiscountedPrice', () => {

    it('should the discounted price for a composite product', () => {
			const expected = cold('a', { a: 
				stubCompositeProduct.price 
				+ stubCompositeProduct.items[0].options[0].price 
				+ stubCompositeProduct.items[1].options[0].price 
				- stubCompositeProduct.discount.amount
			});
	
			expect(facade.getDiscountedPrice(stubCompositeProduct.id)).toBeObservable(expected);
		});
  });

  describe('hasDiscount', () => {

    it('should return whether the product has a discount', () => {
			const expected = cold('a', { a: true });
	
			expect(facade.hasDiscount(stubCompositeProduct.id)).toBeObservable(expected);
		});
	});
	
	describe('getAppliedOptions', () => {
		
		it('should return the applied option for a composite product', () => {
			const expected = cold('a', { a: { 
				[stubCompositeProduct.items[0].id]: {
					value: stubCompositeProduct.items[0].options[0].id,
					qty: 1
				},
				[stubCompositeProduct.items[1].id]: {
					value: stubCompositeProduct.items[1].options[0].id,
					qty: 1
				}
			}});

			expect(facade.getAppliedOptions(stubCompositeProduct.id)).toBeObservable(expected);
		});
	});
});
