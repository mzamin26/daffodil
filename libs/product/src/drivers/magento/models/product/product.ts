import { MagentoProductImage } from './product-image';
import { MagentoProductPrice } from './product-price';

/**
 * An object for defining what the product service requests and retrieves from a magento backend.
 */
export interface MagentoProduct {
  id: number;
  name: string;
  sku: string;
  url_key: string;
  image: MagentoProductImage;
  price: MagentoProductPrice;
  media_gallery_entries?: any;
  short_description?: any;
  description?: any;
}
