'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Order } from '@/types/typeOrders';

interface OrderDetailUIProps {
  order: Order;
}
export default function PaymentSuccessUI({ order }: OrderDetailUIProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">Đặt hàng thành công 🎉</h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận và đang được xử lý.
        </p>

        {/* Order info (UI only) */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-left mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Mã đơn hàng</span>
            <span className="font-medium">#{order.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Phương thức thanh toán</span>
            <span className="font-medium">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tổng tiền</span>
            <span className="font-semibold text-red-500">{order.total}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/orders"
            className="block w-full py-3 rounded-md bg-black text-white font-semibold hover:opacity-90"
          >
            Xem đơn hàng
          </Link>

          <Link
            href="/"
            className="block w-full py-3 rounded-md border font-semibold hover:bg-gray-50"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
