export interface ReviewCustomer {
  username: string;
  avatar: string;
}

export interface ReviewProductInfo {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  supplierName: string;
  thumbnail: string;
}

export interface ReviewItem {
  id: number;
  title: string;
  body: string;
  rating: number;
  recommend: boolean;
  createdAt: string;

  customerId: number;
  orderId: number;
  productId: number;

  customer: ReviewCustomer;
  product: ReviewProductInfo;
}

export interface ReviewListResponse {
  page: number;
  count: number;
  totalResults: number;
  reviews: ReviewItem[];
}
