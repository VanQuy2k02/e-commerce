'use client';
import { Auth } from '@/service/authencation';
import { LoginProps } from '@/types/typeAuth';
import useAuthStore from '@/zustand/useAuthStore';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginProps>();
  const onSubmit = handleSubmit(async (data: LoginProps) => {
    try {
      setLoading(true);
      const res = await Auth.login(data);
      if (res) {
        setUser(res);
        toast.success('Đăng nhập thành công', { duration: 2000 });
        router.push('/');
        reset();
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại', { duration: 2000 });
      reset();
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="max-w-[960px] mx-auto w-full">
      <div className="px-4">
        <div className="py-3">
          <Image src="/images/login_image.png" alt="login_image" width={928} height={320} />
        </div>
        <div className="flex gap-8 border-b border-[#CFD9E8] mb-3">
          <span
            onClick={() => router.push('/login')}
            className="text-1c text-14 font-bold leading-height-21 pt-4 pb-[13px] inline  border-b-2 border-[#E5E8EB] cursor-pointer"
          >
            Login
          </span>
          <span
            onClick={() => router.push('/register')}
            className="text-9c text-14 font-bold leading-height-21 pt-4 pb-[13px] cursor-pointer"
          >
            Register
          </span>
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col w-120 h-[112px]">
            <label className="text-1c font-medium leading-6">Username</label>
            <input
              {...register('username', {
                required: 'Username không được để trống',
                minLength: {
                  value: 3,
                  message: 'Username tối thiểu 3 ký tự',
                },
              })}
              className="mt-2 px-[15px] py-[15px] border rounded-[8px]"
              placeholder="Enter your UserName"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col w-120 h-[112px]">
            <label className="text-1c font-medium leading-6">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password không được để trống',
                  minLength: {
                    value: 6,
                    message: 'Password tối thiểu 6 ký tự',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                    message: 'Password phải có ít nhất 1 chữ và 1 số',
                  },
                })}
                className=" px-[15px] w-[480px] py-[15px] border rounded-[8px]"
                placeholder="Enter your Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            className="bg-f2 text-white py-[9.5px] w-[481px] text-center rounded-[8px]"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sign In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
