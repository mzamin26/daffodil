import { TestBed } from '@angular/core/testing';

import { ProductNode } from '@daffodil/product';
import { DaffCategoryFactory, DaffCategoryPageConfigurationStateFactory } from '@daffodil/category/testing';

import { DaffMagentoCategoryPageConfigTransformerService } from './category-page-config-transformer.service';
import { DaffCategory } from '../../../models/category';
import { DaffCategoryPageConfigurationState } from '../../../models/category-page-configuration-state';
import { MagentoCategory } from '../models/category';
import { MagentoAggregation } from '../models/aggregation';
import { MagentoPageInfo } from '../models/page-info';
import { MagentoSortFields } from '../models/sort-fields';
import { MagentoCompleteCategoryResponse } from '../models/complete-category-response';
import { DaffCategoryFilterTypes } from '../../../models/category-filter';

describe('DaffMagentoCategoryPageConfigTransformerService', () => {

  let service: DaffMagentoCategoryPageConfigTransformerService;
  const categoryFactory: DaffCategoryFactory = new DaffCategoryFactory();
  const stubCategory: DaffCategory = categoryFactory.create();

  const categoryPageConfigurationStateFactory: DaffCategoryPageConfigurationStateFactory = new DaffCategoryPageConfigurationStateFactory();
  const stubCategoryPageConfigurationState: DaffCategoryPageConfigurationState = categoryPageConfigurationStateFactory.create();
  delete stubCategoryPageConfigurationState.applied_filters;
  delete stubCategoryPageConfigurationState.applied_sort_direction;
  delete stubCategoryPageConfigurationState.applied_sort_option;
	stubCategoryPageConfigurationState.id = stubCategory.id;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DaffMagentoCategoryPageConfigTransformerService
      ]
    });
    service = TestBed.get(DaffMagentoCategoryPageConfigTransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('transform', () => {
		let completeCategoryResponse: MagentoCompleteCategoryResponse;
		let category: MagentoCategory;
		let aggregates: MagentoAggregation[];
		let page_info: MagentoPageInfo;
		let sort_fields: MagentoSortFields;
		let products: ProductNode[];

		beforeEach(() => {
			category = {
        id: stubCategory.id,
        name: stubCategory.name,
        breadcrumbs: [{
          category_id: stubCategory.breadcrumbs[0].categoryId,
          category_name: stubCategory.breadcrumbs[0].categoryName,
          category_level: stubCategory.breadcrumbs[0].categoryLevel,
          category_url_key: stubCategory.breadcrumbs[0].categoryUrlKey
        }],
        children_count: stubCategory.children_count
			}
			
			aggregates = [{
				attribute_code: stubCategoryPageConfigurationState.filters[0].name,
				count: stubCategoryPageConfigurationState.filters[0].items_count,
				label: stubCategoryPageConfigurationState.filters[0].label,
				options: [
					{
						value: stubCategoryPageConfigurationState.filters[0].options[0].value,
						count: stubCategoryPageConfigurationState.filters[0].options[0].items_count,
						label: stubCategoryPageConfigurationState.filters[0].options[0].label
					},
					{
						value: stubCategoryPageConfigurationState.filters[0].options[1].value,
						count: stubCategoryPageConfigurationState.filters[0].options[1].items_count,
						label: stubCategoryPageConfigurationState.filters[0].options[1].label
					}
				]
			}];
			
			page_info = {
				page_size: stubCategoryPageConfigurationState.page_size,
				current_page: stubCategoryPageConfigurationState.current_page,
				total_pages: stubCategoryPageConfigurationState.total_pages
			};

			sort_fields = {
				default: stubCategoryPageConfigurationState.sort_options[0].value,
				options: stubCategoryPageConfigurationState.sort_options
			};

			products = [
				{
					sku: stubCategoryPageConfigurationState.product_ids[0],
					id: 2,
					name: 'name',
					price: {
						regularPrice: 123
					},
					url_key: 'url_key',
					image: {
						url: 'url',
						label: 'label'
					}
				}
			];

			completeCategoryResponse = {
				category: category,
				aggregates: aggregates,
				page_info: page_info,
				sort_fields: sort_fields,
				products: products,
				total_count: stubCategoryPageConfigurationState.total_products
			}
		});
    
    it('should return a DaffCategoryPageConfigurationState', () => {
      expect(service.transform(completeCategoryResponse)).toEqual(stubCategoryPageConfigurationState);
		});

		describe('filter type', () => {
		
			it('should set the filter type to Equal for the category_id aggregation', () => {
				aggregates[0].attribute_code = 'category_id';
				expect(service.transform(completeCategoryResponse).filters[0].type).toEqual(DaffCategoryFilterTypes.Equal);
			});
		
			it('should set the filter type to Match for the description aggregation', () => {
				aggregates[0].attribute_code = 'description';
				expect(service.transform(completeCategoryResponse).filters[0].type).toEqual(DaffCategoryFilterTypes.Match);
			});
		
			it('should set the filter type to Equal for the name aggregation', () => {
				aggregates[0].attribute_code = 'name';
				expect(service.transform(completeCategoryResponse).filters[0].type).toEqual(DaffCategoryFilterTypes.Match);
			});
		
			it('should set the filter type to Equal for the price aggregation', () => {
				aggregates[0].attribute_code = 'price';
				expect(service.transform(completeCategoryResponse).filters[0].type).toEqual(DaffCategoryFilterTypes.Range);
			});
		
			it('should set the filter type to Equal for the short_description aggregation', () => {
				aggregates[0].attribute_code = 'short_description';
				expect(service.transform(completeCategoryResponse).filters[0].type).toEqual(DaffCategoryFilterTypes.Match);
			});
		
			it('should set the filter type to Equal for the sku aggregation', () => {
				aggregates[0].attribute_code = 'sku';
				expect(service.transform(completeCategoryResponse).filters[0].type).toEqual(DaffCategoryFilterTypes.Equal);
			});
		
			it('should set the filter type to Equal for the url_key aggregation', () => {
				aggregates[0].attribute_code = 'url_key';
				expect(service.transform(completeCategoryResponse).filters[0].type).toEqual(DaffCategoryFilterTypes.Equal);
			});

			it('should set the filter type to Equal by default', () => {
				aggregates[0].attribute_code = 'other_filter';
				expect(service.transform(completeCategoryResponse).filters[0].type).toEqual(DaffCategoryFilterTypes.Equal);
			});
		});
  });
});
