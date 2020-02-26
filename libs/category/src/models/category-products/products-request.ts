import { DaffCategoryFilterAction } from "./filter-action";
import { DaffCategorySortFieldAction } from "./sort-field-action";

export interface DaffCategoryProductsRequest {
	id: string;
	filters?: DaffCategoryFilterAction[];
	text_search?: string;
	page_size?: number;
	current_page?: number;
	sort?: DaffCategorySortFieldAction;
}
