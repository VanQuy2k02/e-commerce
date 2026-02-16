import { editProps } from '@/app/(root)/(users)/profile/[id]/page';
import { ProfilerProps } from 'react';

export const User = {
  getUserProfile: async (customerId: number) => {
    const res = await fetch(`http://localhost:3000/api/profile/${customerId}`);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    return res.json();
  },

  editUserProfile: async (customerId: number, data: editProps) => {
    const res = await fetch(`http://localhost:3000/api/profile/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: ProfilerProps = await res.json();

    if (!res.ok) {
      console.log('call api k thành công');
    }
    return {
      status: res.status, // 👈 200
      data: result,
    };
  },
};
