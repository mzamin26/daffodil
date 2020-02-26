import { MagentoProduct } from '../product/product';
import { MagentoAggregation } from './aggregation/aggregation';
import { MagentoSortFields } from './sort/sort-fields';
import { MagentoPageInfo } from './page-info/page-info';

export interface MagentoGetProductsForCategoryResponse {
	aggregates: MagentoAggregation[];
	products: MagentoProduct[];
	sort_fields: MagentoSortFields;
	page_info: MagentoPageInfo;
}
