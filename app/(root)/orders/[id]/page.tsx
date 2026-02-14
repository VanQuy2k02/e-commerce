import { handleOrders } from '@/service/orders';
import Image from 'next/image';

export default async function OrderDetailUI({ params }: { params: { id: number } }) {
  const { id } = await params;
  const res = await handleOrders.getDetailOrders(id);
  console.log(res, 'result');

  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Chi tiết đơn hàng</h1>
          <p className="text-sm text-muted-foreground">
            Mã đơn: <span className="font-medium text-black">#205</span>
          </p>
        </div>

        <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
          Hoàn thành
        </span>
      </div>

      {/* Status timeline */}
      <div className="flex justify-between items-center mb-8">
        {['Đã đặt hàng', 'Đang xử lý', 'Đang giao', 'Hoàn thành'].map((step, index) => (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${index <= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}
            >
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
          <li className="py-4 flex gap-4">
            <Image
              src="/images/cart-product1.png"
              alt=""
              width={80}
              height={80}
              className="w-20 h-20 rounded-lg border object-cover"
            />

            <div className="flex-1">
              <p className="font-medium line-clamp-2">Replica semi-auto DS-3 Dahl Stopper</p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">Số lượng: x2</p>
                <p className="font-semibold">$52</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Address & payment */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-xl p-4 bg-white">
          <h3 className="font-semibold mb-2">Địa chỉ giao hàng</h3>
          <p className="text-sm text-muted-foreground">
            2 Audrey Field, Suite 630
            <br />
            Dicki Hill, Northamptonshire
          </p>
        </div>

        <div className="border rounded-xl p-4 bg-white">
          <h3 className="font-semibold mb-2">Thanh toán</h3>
          <p className="text-sm text-muted-foreground">Phương thức: Card</p>
        </div>
      </div>

      {/* Summary */}
      <div className="border rounded-xl p-4 bg-white">
        <div className="flex justify-between text-sm mb-2">
          <span>Tạm tính</span>
          <span>$104</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Phí vận chuyển</span>
          <span>$0</span>
        </div>

        <div className="flex justify-between text-base font-semibold border-t pt-3">
          <span>Tổng cộng</span>
          <span className="text-red-500">$29.21</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 border rounded-md text-sm">Liên hệ hỗ trợ</button>
          <button className="px-4 py-2 bg-black text-white rounded-md text-sm">Mua lại</button>
        </div>
      </div>
    </div>
  );
}
