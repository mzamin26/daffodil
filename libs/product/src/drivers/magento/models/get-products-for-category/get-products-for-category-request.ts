/**
 * Note: these models shouldn't really be here, but they need to be here until magento category calls
 * can retrieve all necessary product information. Having these models here keeps the @daffodil/product
 * package independent of the @daffodil/category package.
 */
export interface MagentoGetProductsForCategoryRequest {
	filters: MagentoCategoryFilters;
	search?: string;
	page_size?: number;
	current_page?: number;
	sort?: MagentoSortFieldAction;
}

export interface MagentoCategoryFilters {
	[x: string]: MagentoFilterAction;
}

export interface MagentoFilterAction {
	[x: string]: string;
}

export interface MagentoSortFieldAction {
	[x: string]: string;
}
