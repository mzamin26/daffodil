import { Component, Input, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Cart } from '@daffodil/core';
import { CartFactory } from '@daffodil/core/testing';

import { CartWrapperComponent } from './cart-wrapper.component';
import { ContinueShoppingModule } from '../continue-shopping/continue-shopping.module';
import { ProceedToCheckoutModule } from '../proceed-to-checkout/proceed-to-checkout.module';
import { RouterTestingModule } from '@angular/router/testing';

@Component({template: '<cart-wrapper [cart]="cartValue"></cart-wrapper>'})
class TestCartWrapper {
  cartValue: Cart;
}

@Component({
  selector: 'cart',
  template: ''
})
class CartMock { 
  @Input() cart: Cart;
  @Input() title: string;
}

@Component({
  selector: 'promotion',
  template: ''
})
class PromotionMock {}

@Component({
  selector: 'cart-totals',
  template: ''
})
class CartTotalsMock {
  @Input() cart: Cart;
}

@Component({
  selector: 'help-box',
  template: ''
})
class HelpBoxMock {}

@Directive({
  selector: '[proceed-to-checkout]'
})
class ProceedToCheckoutMock {}

@Directive({
  selector: '[continue-shopping]'
})
class ContinueShoppingMock {}

describe('CartWrapper', () => {
  let component: TestCartWrapper;
  let fixture: ComponentFixture<TestCartWrapper>;
  let cartWrapperComponent: CartWrapperComponent;
  let cartComponent;
  let promotionComponent;
  let cartTotalsComponent;
  let helpBoxComponent;
  let proceedToCheckoutComponent;
  let continueShoppingComponent;
  let cartFactory = new CartFactory();
  let cart = cartFactory.create();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TestCartWrapper,
        CartMock,
        CartTotalsMock,
        HelpBoxMock,
        ProceedToCheckoutMock,
        ContinueShoppingMock,
        PromotionMock,
        CartWrapperComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCartWrapper);
    component = fixture.componentInstance;
    component.cartValue = cart;
    cartWrapperComponent = fixture.debugElement.query(By.css('cart-wrapper')).componentInstance;

    fixture.detectChanges();

    cartComponent = fixture.debugElement.query(By.css('cart'));
    promotionComponent = fixture.debugElement.query(By.css('promotion'));
    cartTotalsComponent = fixture.debugElement.query(By.css('cart-totals'));
    helpBoxComponent = fixture.debugElement.query(By.css('help-box'));
    proceedToCheckoutComponent = fixture.debugElement.query(By.css('[proceed-to-checkout]'));
    continueShoppingComponent = fixture.debugElement.query(By.css('[continue-shopping]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to take cart as input', () => {
    expect(cartWrapperComponent.cart).toEqual(cart);
  });

  describe('on <cart>', () => {
    
    it('should set cart to value passed by cart-container directive', () => {
      expect(cartComponent.componentInstance.cart).toEqual(cart);
    });
  });

  describe('when CartContainer.$loading is false', () => {
    
    it('should render <cart>', () => {
      expect(cartComponent).not.toBeNull();
    });

    it('should render <help-box>', () => {
      expect(helpBoxComponent).not.toBeNull();
    });

    describe('and cart is empty', () => {

      it('should not render .cart-wrapper__summary-title', () => {
        let summaryTitleElement = fixture.debugElement.query(By.css('.cart-wrapper__summary-title'));

        expect(summaryTitleElement).toBeNull();
      });

      it('should not render <promotion>', () => {
        expect(promotionComponent).toBeNull();
      });

      it('should not render <cart-totals>', () => {
        expect(cartTotalsComponent).toBeNull();
      });
      
      it('should not render <proceed-to-checkout>', () => {
        expect(proceedToCheckoutComponent).toBeNull();
      });

      it('should render <continue-shopping>', () => {
        expect(continueShoppingComponent).not.toBeNull();
      });
    });

    describe('and cart has at least one item', () => {
      
      beforeEach(() => {
        cart.items.push(cartFactory.createCartItem());
        component.cartValue = cart;

        fixture.detectChanges();
      });

      it('should render .cart-wrapper__summary-title', () => {
        let summaryTitleElement = fixture.debugElement.query(By.css('.cart-wrapper__summary-title'));
        
        expect(summaryTitleElement).not.toBeNull();
      });

      it('should render <promotion>', () => {
        let promotionComponent = fixture.debugElement.query(By.css('promotion'))

        expect(promotionComponent).not.toBeNull();
      });

      it('should render <cart-totals>', () => {
        let cartTotalsComponent = fixture.debugElement.query(By.css('cart-totals'))
        expect(cartTotalsComponent).not.toBeNull();
      });
    
      it('should set cart to value passed by the cart-container directive', () => {
        expect(cartTotalsComponent.componentInstance.cart).toEqual(cart);
      });

      it('should render <proceed-to-checkout>', () => {
        expect(proceedToCheckoutComponent).not.toBeNull();
      });

      it('should render <continue-shopping>', () => {
        expect(continueShoppingComponent).not.toBeNull();
      });
    });
  });

  describe('isCartEmpty', () => {

    it('should return false if there are one or more items in the cart', () => {
      component.cartValue.items.push(cartFactory.createCartItem());

      expect(cartWrapperComponent.isCartEmpty).toEqual(false);
    });

    it('should return true if there are no items in the cart', () => {
      component.cartValue.items = [];

      expect(cartWrapperComponent.isCartEmpty).toEqual(true);
    });
  });

  describe('cartHasOneItem', () => {

    it('should return false if there are no items in the cart', () => {
      component.cartValue.items = [];

      expect(cartWrapperComponent.cartHasOneItem).toEqual(false);
    });

    it('should return true if there is exactly one item in the cart', () => {
      component.cartValue.items = [cartFactory.createCartItem()];

      expect(cartWrapperComponent.cartHasOneItem).toEqual(true);
    });

    it('should return false if there are two or more items in the cart', () => {
      component.cartValue.items.push(cartFactory.createCartItem(), cartFactory.createCartItem());

      expect(cartWrapperComponent.cartHasOneItem).toEqual(false);
    });
  });

  describe('getItemText', () => {

    it('should return Item if there is one item in the cart', () => {
      component.cartValue.items = [cartFactory.createCartItem()];

      expect(cartWrapperComponent.itemText).toEqual('Item');
    });

    it('should return Items if there is more than one item or zero in the cart', () => {
      component.cartValue.items.push(cartFactory.createCartItem(), cartFactory.createCartItem());

      expect(cartWrapperComponent.itemText).toEqual('Items');
    });
  });
});