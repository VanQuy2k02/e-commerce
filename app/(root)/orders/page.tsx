'use client';

import { handleOrders } from '@/service/orders';
import { Order } from '@/types/typeOrders';
import { formatDate } from '@/utilities/formatDate';
import { cn } from '@/utilities/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState<boolean>(false);
  useEffect(() => {
    const loadingDataOrders = async () => {
      const res = await handleOrders.getOrders();
      if (res.status === 200) {
        setOrders(res.data.orders);
      }
    };
    loadingDataOrders();
  }, []);
  const ordersItem = showOrders ? orders : orders.slice(0, 2);

  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      {/* Filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button className="px-4 py-2 rounded-full bg-black text-white">Tất cả</button>
        <button className="px-4 py-2 rounded-full border">Chờ xác nhận</button>
        <button className="px-4 py-2 rounded-full border">Đang giao</button>
        <button className="px-4 py-2 rounded-full border">Hoàn thành</button>
      </div>
      {ordersItem.length > 0 ? (
        ordersItem.map((item) => (
          <div key={item.id} className="border rounded-xl p-4 mb-6 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Mã đơn: <span className="font-medium text-black">#{item.id}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Ngày đặt: {formatDate(item.createdAt)}
                </p>
              </div>

              <span
                className={cn(
                  'px-3 py-1 rounded-full text-sm',
                  item.status === 'completed' && 'bg-green-100 text-green-700',
                  item.status === 'pending' && 'bg-yellow-100 text-yellow-700',
                  item.status === 'shipping' && 'bg-blue-100 text-blue-700',
                )}
              >
                {item.status}
              </span>
            </div>

            {/* Product */}
            <ul className="divide-y">
              {item.orderItems.map((orderItem) => (
                <li key={orderItem.product.id} className="py-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Image
                      src="/images/cart-product1.png"
                      alt={orderItem.product.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg border object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <p className="font-medium line-clamp-2">{orderItem.product.name}</p>

                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-muted-foreground">
                          Số lượng: x{orderItem.quantity}
                        </p>

                        <p className="font-semibold text-sm">{orderItem.product.price}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <p className="font-semibold">
                Tổng tiền: <span className="text-red-500">{item.total}</span>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/orders/${item.id}`)}
                  className="px-4 py-2 border rounded-md text-sm"
                >
                  Xem chi tiết
                </button>
                <button className="px-4 py-2 bg-black text-white rounded-md text-sm">
                  Mua lại
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Image
            src="/images/noSearch-image.png"
            alt="no-order_image"
            width={260}
            height={200}
            className=" mb-4"
          />

          <p className="text-lg font-medium">Bạn chưa có đơn hàng nào</p>

          <p className="text-sm text-muted-foreground mb-4">Hãy mua sắm để trải nghiệm nhé!</p>

          <button
            onClick={() => router.push('/products')}
            className="px-6 py-2 bg-black text-white rounded-md"
          >
            Mua sắm ngay
          </button>
        </div>
      )}
      {/* Show more / collapse */}
      {orders.length > 2 && (
        <div className="flex justify-center mt-8">
          {/* Show more / collapse */}
          {orders.length > 2 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowOrders(!showOrders)}
                className="flex items-center gap-2 px-6 py-2 rounded-full border text-sm font-medium
                 hover:bg-black hover:text-white transition-all duration-200"
              >
                {showOrders ? (
                  <>
                    Thu gọn
                    <span className="text-lg leading-none">↑</span>
                  </>
                ) : (
                  <>
                    Xem thêm đơn hàng
                    <span className="text-lg leading-none">↓</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
