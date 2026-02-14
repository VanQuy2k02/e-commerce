'use client';
import { User } from '@/service/user';
import { formatDate } from '@/utilities/formatDate';
import useAuthStore from '@/zustand/useAuthStore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface profileProps {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string | null;
  phone: string | null;
  billingAddress?: string | null;
  billingAddressId?: number | null;
  shippingAddress?: string | null;
  shippingAddressId?: number | null;
  oAuth?: string | null;
  joinDate?: string;
}

export type editProps = Pick<profileProps, 'name' | 'username' | 'email' | 'password' | 'phone'>;

export default function Profile() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<profileProps>({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const id = user?.id;

  useEffect(() => {
    if (!id) return;
    const loadProfile = async () => {
      const data = await User.getUserProfile(Number(id));
      setProfile(data);
    };
    loadProfile();
  }, [id]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const payload: editProps = {
        name: profile.name,
        username: profile.username,
        email: profile.email,
        password: profile.password,
        phone: profile.phone,
      };

      const res = await User.editUserProfile(Number(id), payload);

      if (res.status === 200) {
        toast.success('Cập nhật thành công 🎉', { duration: 2000 });
      }
    } catch (err) {
      toast.error('Cập nhật thất bại');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl border shadow-sm p-8">
        {/* Avatar + Title */}
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={profile.avatar || 'https://github.com/shadcn.png'} />
            <AvatarFallback>{profile.name?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>

          <h1 className="text-xl font-semibold text-gray-800">{profile.name || 'User Profile'}</h1>
          <p className="text-sm text-gray-500">Tham gia từ {formatDate(profile.joinDate)}</p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Họ tên</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleOnchange}
              className="w-full rounded-lg border px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Username</label>
            <input
              name="username"
              value={profile.username}
              onChange={handleOnchange}
              className="w-full rounded-lg border px-3 py-2 text-sm
            focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleOnchange}
              className="w-full rounded-lg border px-3 py-2 text-sm
            focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleOnchange}
              placeholder="••••••••"
              className="w-full rounded-lg border px-3 py-2 text-sm
            focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Số điện thoại</label>
            <input
              name="phone"
              value={profile.phone || ''}
              onChange={handleOnchange}
              className="w-full rounded-lg border px-3 py-2 text-sm
            focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleEditProfile}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white
        hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang cập nhật...' : 'Lưu thay đổi'}
        </button>
      </div>
    </div>
  );
}
