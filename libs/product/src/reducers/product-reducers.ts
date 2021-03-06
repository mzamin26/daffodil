import { daffProductGridReducer } from './product-grid/product-grid.reducer';
import { daffProductReducer } from './product/product.reducer';
import { daffBestSellersReducer } from './best-sellers/best-sellers.reducer';
import { daffProductEntitiesReducer } from './product-entities/product-entities.reducer';
import { daffConfigurableProductEntitiesReducer } from './configurable-product-entities/configurable-product-entities.reducer';
import { daffCompositeProductEntitiesReducer } from './composite-product-entities/composite-product-entities.reducer';

/**
 * Returns state values from all product related reducers.
 */
export const daffProductReducers = {
	products: daffProductEntitiesReducer,
	productGrid: daffProductGridReducer,
	product: daffProductReducer,
	bestSellers: daffBestSellersReducer,
	configurableProductAttributes: daffConfigurableProductEntitiesReducer,
	compositeProductOptions: daffCompositeProductEntitiesReducer
}
