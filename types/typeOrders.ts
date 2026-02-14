export interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // BE trả string
  stock: number;
  categoryName: string;
  supplierName: string;
  thumbnail: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county: string;
  postcode: string;
}

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'shipping';

export interface Order {
  id: number;
  customerId: number;

  billingAddressId: number;
  shippingAddressId: number;

  billingAddress?: Address;
  shippingAddress: Address;

  orderItems: OrderItem[];

  paymentMethod: 'Card' | 'COD' | 'Paypal';

  status: OrderStatus;
  total: string;

  createdAt: string;
}
