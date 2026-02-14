'use client';
import { Auth } from '@/service/authencation';
import { signupReq } from '@/types/typeAuth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signupReq>();
  const onSubmit = handleSubmit(async (data: signupReq) => {
    try {
      setLoading(true);
      const res = await Auth.register(data);
      if (res) {
        toast.success('Đăng ký thành công', { duration: 2000 });
        router.push('/login');
        reset();
      }
    } catch (error) {
      toast.error('Đăng ký thất bại', { duration: 2000 });
      reset();
    } finally {
      setLoading(false);
    }
  });
  return (
    <div className="max-w-[1280px] mx-auto w-full">
      <div className="py-5 px-6">
        <div className="flex gap-1">
          <div>
            <Image src="/images/register_image.png" alt="register_image" width={320} height={320} />
          </div>
          <div>
            <div className="w-[908px] pl-4 flex gap-8 border-b border-[#CFD9E8] mb-3">
              <span
                onClick={() => router.push('/login')}
                className="pt-4 pb-[13px] text-9c text-14 font-bold leading-height-21 cursor-pointer"
              >
                Login
              </span>
              <span
                onClick={() => router.push('/register')}
                className="pt-4 pb-[13px] text-1c text-14 font-bold leading-height-21 border-b-2 border-[#E5E8EB] cursor-pointer"
              >
                Register
              </span>
            </div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col w-120 h-[112px] px-3 py-4">
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
                  placeholder="Enter your useName"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>
              <div className="flex flex-col w-120 h-[112px] px-3 py-4">
                <label className="text-1c font-medium leading-6">Password</label>
                <input
                  type="password"
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
                  className="mt-2 px-[15px] py-[15px] border rounded-[8px]"
                  placeholder="Enter your Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col w-120 h-[112px] px-3 py-4">
                <label className="text-1c font-medium leading-6">Name</label>
                <input
                  {...register('name', {
                    required: 'Họ tên không được để trống',
                    minLength: {
                      value: 3,
                      message: 'Họ tên tối thiểu 3 ký tự',
                    },
                  })}
                  className="mt-2 px-[15px] py-[15px] border rounded-[8px]"
                  placeholder="Enter your Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div className="flex flex-col w-120 h-[112px] px-3 py-4">
                <label className="text-1c font-medium leading-6">Email</label>
                <input
                  {...register('email', {
                    required: 'Email không được để trống',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email không hợp lệ',
                    },
                  })}
                  className="mt-2 px-[15px] py-[15px] border rounded-[8px]"
                  placeholder="Enter your Email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col w-120 h-[112px] px-3 py-4">
                <label className="text-1c font-medium leading-6">Phone Number</label>
                <input
                  {...register('phone', {
                    required: 'Số điện thoại không được để trống',
                    pattern: {
                      value: /^(0[3|5|7|8|9])[0-9]{8}$/,
                      message: 'Số điện thoại Việt Nam không hợp lệ',
                    },
                  })}
                  className="mt-2 px-[15px] py-[15px] border rounded-[8px]"
                  placeholder="Enter your Phone"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <button
                className="bg-f2 text-[#F7FAFC] text-14 font-bold py-[9.5px] px-44 text-center rounded-[8px] mx-3 my-4"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Create Account'}
              </button>
            </form>
            <p className="px-3 ml-24 text-9c text-14 leading-height-21 font-normal">
              Already have an account?{' '}
              <span className="cursor-pointer" onClick={() => router.push('/login')}>
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
