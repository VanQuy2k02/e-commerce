'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
};
export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

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
          <button
            className="bg-f2 text-white py-[9.5px] px-54 text-center rounded-[8px]"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
