import { Injectable, Inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';

import { DaffProductServiceInterface } from '../interfaces/product-service.interface';
import { DaffProductTransformer } from '../injection-tokens/product-transformer.token';
import { DaffProductTransformerInterface } from '../interfaces/product-transformer.interface';
import { DaffProductUnion } from '../../models/product-union';
import { GetAllProductsQuery } from './queries/get-all-products';
import { GetProductQuery } from './queries/get-product';
import { GetProductsForCategoryQuery } from './queries/get-all-products-for-category';
import { MagentoGetProductsForCategoryRequest } from './models/get-products-for-category/get-products-for-category-request';
import { MagentoGetProductsForCategoryResponse } from './models/get-products-for-category/get-products-for-category-response';

/**
 * A service for making magento apollo queries for products of type, DaffProductUnion.
 */
@Injectable({
  providedIn: 'root'
})
export class DaffMagentoProductService implements DaffProductServiceInterface<DaffProductUnion> {  
  constructor(
    private apollo: Apollo,
    @Inject(DaffProductTransformer) public transformer: DaffProductTransformerInterface<DaffProductUnion>) {}

  /**
   * Get an Observable of a DaffProductUnion by id.
   * @param productId a product Id
   */
  get(productId: string): Observable<DaffProductUnion> {
    return this.apollo.query<any>({
			query: GetProductQuery,
			variables: {
				sku: productId
			}
		}).pipe(
      map(result => this.transformer.transform(result.data))
    );
  }

  /**
   * Get an Observable of an array of DaffProductUnions.
   */
  getAll(): Observable<DaffProductUnion[]> {
    return this.apollo.query<any>({
			query: GetAllProductsQuery
		}).pipe(
      map(result => this.transformer.transformMany(result.data.products.items))
    );
  }

  /**
   * Get an Observable of an array of products, aggregates, page info, and sorting options for a given set of categories.
	 * This method will be moved to the category driver as soon as magento allows.
   */
  getAllProductsForCategory(request: MagentoGetProductsForCategoryRequest): Observable<MagentoGetProductsForCategoryResponse> {
    return this.apollo.query<any>({
			query: GetProductsForCategoryQuery,
			variables: {
				filters: request.filters,
				search: request.search,
				pageSize: request.page_size,
				currentPage: request.current_page,
				sort: request.sort
			}
		}).pipe(
      map(result => result.data)
    );
  }

  //todo: add actual getBestSellers apollo call for Magento.
  //todo: move to a different bestsellers module.
  getBestSellers(): Observable<DaffProductUnion[]> {
    return of(null);
  }
}
