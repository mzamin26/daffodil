import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';

import { HeaderComponent } from './header.component';
import { ToggleShowSidebar } from '../../actions/sidebar.actions';
import * as fromFoundationHeader from '../../reducers/index';

@Component({selector: 'sidebar', template: ''})
class MockSidebarComponent {
  @Input() showSidebar: boolean;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store;
  let stubShowSidebar;
  let sidebar: MockSidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          foundationHeader: combineReducers(fromFoundationHeader.reducers),
        })
      ],
      declarations: [ 
        MockSidebarComponent,
        HeaderComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    component = fixture.componentInstance;

    stubShowSidebar = false;
    spyOn(fromFoundationHeader, 'selectShowSidebar').and.returnValue(stubShowSidebar);

    fixture.detectChanges();

    sidebar = fixture.debugElement.query(By.css('sidebar')).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on <sidebar>', () => {
    
    it('should set showSidebar', () => {
      expect(sidebar.showSidebar).toEqual(stubShowSidebar);
    });
  });

  describe('ngOnInit', () => {
    
    it('should initialize showSidebar$', () => {
      component.showSidebar$.subscribe((showSidebar) => {
        expect(showSidebar).toEqual(stubShowSidebar);
      });
    });
  });

  describe('toggleShowSidebar', () => {
    
    it('should call store.dispatch with a ToggleShowSidebar action within a setTimeout', fakeAsync(() => {
      component.toggleShowSidebar();
      tick(200);

      expect(store.dispatch).toHaveBeenCalledWith(new ToggleShowSidebar());
    }));
  });

  describe('when open-icon is clicked', () => {
    
    it('should call toggleShowSidebar', () => {
      spyOn(component, 'toggleShowSidebar');
      fixture.debugElement.query(By.css('.header__open-icon')).nativeElement.click();

      expect(component.toggleShowSidebar).toHaveBeenCalled();
    });
  });
});