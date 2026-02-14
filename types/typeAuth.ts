export interface resAuth {
  customer: signupRes;
  status: number;
  success: boolean;
  message: string;
}

export interface signupReq {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string | null;
}

export interface signupRes {
  id: number;
  name: string;
  username: string;
  email: string;
  joinDate: string;
  phone: null | string;
  billingAddressId: null | number;
  shippingAddressId: null | number;
  avatar: null | string;
  password: string;
}

export type LoginProps = Pick<signupReq, 'username' | 'password'>;

export interface signoutRes {
  msg: string;
  status: number;
}
