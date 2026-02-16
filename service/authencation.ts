import { LoginProps, resAuth, signoutRes, signupReq } from '@/types/typeAuth';

export const Auth = {
  login: async (body: LoginProps) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    const data: resAuth = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Đăng nhập thất bại');
    }
    return data.customer;
  },
  register: async (body: signupReq) => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data: resAuth = await res.json();
    if (!res.ok) {
      throw new Error('Đăng nhập thất bại');
    }
    return data.customer;
  },

  logout: async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });

    const data: signoutRes = await res.json();
    if (!res.ok) {
      throw new Error('Đăng nhập thất bại');
    }
    return data;
  },
};
