export interface CustomerProfile {
  id: number;
  name: string;
  username: string;
  password: string; // backend mask "**********"
  email: string;
  joinDate: string; // ISO string
  phone: string | null;

  billingAddressId: number | null;
  shippingAddressId: number | null;

  avatar: string | null;

  billingAddress: Address | null;
  shippingAddress: Address | null;

  oAuth: OAuthProvider | null;
}

export interface Address {
  id: number;
  fullName: string;
  phone: string;
  addressLine: string;
  ward: string;
  district: string;
  city: string;
  country: string;
}

export interface OAuthProvider {
  provider: 'google' | 'facebook' | 'github';
  providerId: string;
}
