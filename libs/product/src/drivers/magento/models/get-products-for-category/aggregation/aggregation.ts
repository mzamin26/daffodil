import { MagentoAggregationOption } from './aggregation-option';

/**
 * Filterable options for products.
 */
export interface MagentoAggregation {
	attribute_code: String;
	count?: number;
	label?: string;
	options?: MagentoAggregationOption[];
}
