'use client';
import { Order } from '@/types/typeOrders';
import Image from 'next/image';

interface OrderDetailUIProps {
  order: Order;
}
export default function OrderDetailUI({ order }: OrderDetailUIProps) {
  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Chi tiết đơn hàng</h1>
          <p className="text-sm text-muted-foreground">
            Mã đơn: <span className="font-medium text-black">#{order.id}</span>
          </p>
        </div>

        <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
          {order.status}
        </span>
      </div>

      {/* Status timeline */}
      <div className="flex justify-between items-center mb-8">
        {['Đã đặt hàng', 'Đang xử lý', 'Đang giao', 'Hoàn thành'].map((step, index) => (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
              {index + 1}
            </div>
            <p className="text-xs mt-2 text-center">{step}</p>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="border rounded-xl bg-white p-4 mb-6">
        <h2 className="font-semibold mb-4">Sản phẩm</h2>

        <ul className="divide-y">
          {order.orderItems.length > 0 &&
            order.orderItems.map((item, index) => (
              <li key={index} className="py-4 flex gap-4">
                <Image
                  src="/images/cart-product1.png"
                  alt=""
                  width={80}
                  height={80}
                  className="rounded-lg border object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium line-clamp-2">{item.product.name}</p>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-muted-foreground">Số lượng: x{item.quantity}</p>
                    <p className="font-semibold">{item.product.price}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Address & payment */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-xl p-4 bg-white">
          <h3 className="font-semibold mb-2">Địa chỉ giao hàng</h3>
          <p className="text-sm text-muted-foreground">
            {order.shippingAddress.addressLine1} <br />
            {order.shippingAddress.addressLine2}
          </p>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <h3 className="font-semibold mb-2">Thanh toán</h3>
          <p className="text-sm text-muted-foreground">Phương thức: {order.paymentMethod}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="border rounded-xl p-4 bg-white">
        <div className="flex justify-between text-sm mb-2">
          <span>Tạm tính</span>
          <span>{order.total}</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Phí vận chuyển</span>
          <span>$0</span>
        </div>

        <div className="flex justify-between text-base font-semibold border-t pt-3">
          <span>Tổng cộng</span>
          <span className="text-red-500">{order.total}</span>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 border rounded-md text-sm">Liên hệ hỗ trợ</button>
          <button className="px-4 py-2 bg-black text-white rounded-md text-sm">Mua lại</button>
        </div>
      </div>
    </div>
  );
}
