interface Address {
  addressLine1: string;
  addressLine2?: string; // optional nếu có thể rỗng
  city: string;
  county: string;
  postcode: string;
}

type PaymentMethod = 'Card' | 'PayPal' | 'Klarna'; // mở rộng nếu cần

export interface OrderPayload {
  billingAddress: Address;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  total?: number;
}
