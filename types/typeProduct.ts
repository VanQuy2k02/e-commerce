export interface Product {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  supplierName: string;
  thumbnail: string;

  price: number;
  stock: number;

  averageRating: number;
  numOfReviews: number;
  numOfTimesOrdered: number;
  totalUnitsOrdered: number;
}

export interface ResponseProduct {
  page: number;
  count: number;
  totalResults: number;
  products: Product[];
}

export interface ProductDetailProps {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  supplierName: string;
  thumbnail: string;
  averageRating: string;
  totalRatings: number;
  numOfTimesOrdered: number;
}
