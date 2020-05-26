import { Component, OnInit } from '@angular/core';
import { DaffProductGridFacade, DaffProductGridLoad, DaffProduct } from '@daffodil/product';
import { Observable } from 'rxjs';
import { DaffCategoryFacade, DaffCategoryLoad, DaffToggleCategoryFilter, DaffCategoryFilterType, DaffSortDirectionEnum, DaffCategory, DaffCategoryPageConfigurationState, DaffChangeCategoryPageSize, DaffCategoryRequest } from '@daffodil/category';

@Component({
  selector: 'demo-product-grid-view',
  templateUrl: './product-grid-view.component.html'
})
export class ProductGridViewComponent implements OnInit {

  loading$: Observable<boolean>;
  products$: Observable<DaffProduct[]>;

  constructor(
		private facade: DaffProductGridFacade,
		private categoryFacade: DaffCategoryFacade
	) { }

  ngOnInit() {
    this.products$ = this.facade.products$;
		this.loading$ = this.facade.loading$;
		this.categoryFacade.pageConfigurationState$.subscribe((state) => console.log(state));
		// this.categoryFacade.category$.subscribe((state) => console.log(state));
		// this.categoryFacade.products$.subscribe((products) => console.log(products));
		// this.categoryFacade.getTotalProductsByCategory('23').subscribe((products) => console.log(products));
		// this.categoryFacade.appliedFilters$.subscribe((products) => console.log(products));
		// this.categoryFacade.products$.subscribe((products) => console.log(products));

		// this.facade.dispatch(new DaffProductGridLoad());
		this.facade.dispatch(new DaffCategoryLoad({
			id: '17',
			page_size: 11,
		}))
		// this.products$.subscribe((products) => console.log(products));
	}
	
	addFilter() {
		this.facade.dispatch(new DaffToggleCategoryFilter({
				name: 'color',
				value: '51',
				type: DaffCategoryFilterType.Equal
		}))
	}
	
	updatePageSize() {
		this.facade.dispatch(new DaffChangeCategoryPageSize(22))
	}
}
