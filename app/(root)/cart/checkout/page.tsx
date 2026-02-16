'use client';

import { handleOrders } from '@/service/orders';
import { OrderPayload } from '@/types/typeCheckout';
import { useCartStore } from '@/zustand/useCartStore';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function CheckoutPageUI() {
  const { carts, fetchDataCart } = useCartStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const total = useMemo(() => {
    return carts.reduce((acc, item) => {
      return acc + Number(item?.product?.price ?? 0) * item.quantity;
    }, 0);
  }, [carts]);

  const [infoOrders, setInfoOrders] = useState<OrderPayload>({
    billingAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      postcode: '',
    },
    shippingAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      postcode: '',
    },
    paymentMethod: 'Card',
  });

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'billingAddress' | 'shippingAddress',
  ) => {
    const { name, value } = e.target;
    setInfoOrders((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [name]: value,
      },
    }));
  };

  const handlePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoOrders((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload: OrderPayload = {
      ...infoOrders,
      total,
    };
    try {
      setLoading(true);
      const res = await handleOrders.postOrders(payload);
      if (res.status === 201) {
        fetchDataCart();
        toast.success('Đặt hàng thành công', { duration: 2000 });
        router.push(`/payment-success/${res.data.id}`);
        setInfoOrders({
          billingAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            county: '',
            postcode: '',
          },
          shippingAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            county: '',
            postcode: '',
          },
          paymentMethod: 'Card',
        });
      } else {
        toast.error('Đặt hàng không thành công', { duration: 2000 });
        setInfoOrders({
          billingAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            county: '',
            postcode: '',
          },
          shippingAddress: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            county: '',
            postcode: '',
          },
          paymentMethod: 'Card',
        });
      }
    } catch (error) {
      toast.error('Lỗi hệ thống, vui lòng thử lại', { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[960px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="border rounded-xl p-4 bg-white">
            <h2 className="font-semibold mb-4">Shipping Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Address line 1"
                name="addressLine1"
                value={infoOrders.shippingAddress.addressLine1}
                onChange={(e) => handleOnchange(e, 'shippingAddress')}
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Address line 2"
                name="addressLine2"
                value={infoOrders.shippingAddress.addressLine2}
                onChange={(e) => handleOnchange(e, 'shippingAddress')}
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="City"
                name="city"
                value={infoOrders.shippingAddress.city}
                onChange={(e) => handleOnchange(e, 'shippingAddress')}
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="County"
                name="county"
                value={infoOrders.shippingAddress.county}
                onChange={(e) => handleOnchange(e, 'shippingAddress')}
              />
              <input
                className="border rounded-md px-3 py-2 md:col-span-2"
                placeholder="Postcode"
                name="postcode"
                value={infoOrders.shippingAddress.postcode}
                onChange={(e) => handleOnchange(e, 'shippingAddress')}
              />
            </div>
          </div>

          {/* Billing Address */}
          <div className="border rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Billing Address</h2>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Same as shipping
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Address line 1"
                name="addressLine1"
                value={infoOrders.billingAddress.addressLine1}
                onChange={(e) => handleOnchange(e, 'billingAddress')}
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="Address line 2"
                name="addressLine2"
                value={infoOrders.billingAddress.addressLine2}
                onChange={(e) => handleOnchange(e, 'billingAddress')}
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="City"
                name="city"
                value={infoOrders.billingAddress.city}
                onChange={(e) => handleOnchange(e, 'billingAddress')}
              />
              <input
                className="border rounded-md px-3 py-2"
                placeholder="County"
                name="county"
                value={infoOrders.billingAddress.county}
                onChange={(e) => handleOnchange(e, 'billingAddress')}
              />
              <input
                className="border rounded-md px-3 py-2 md:col-span-2"
                placeholder="Postcode"
                name="postcode"
                value={infoOrders.billingAddress.postcode}
                onChange={(e) => handleOnchange(e, 'billingAddress')}
              />
            </div>
          </div>

          {/* Payment */}
          <div className="border rounded-xl p-4 bg-white">
            <h2 className="font-semibold mb-4">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={infoOrders.paymentMethod === 'Card'}
                  value="Card"
                  name="paymentMethod"
                  onChange={(e) => handlePayment(e)}
                />
                Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={infoOrders.paymentMethod === 'PayPal'}
                  value="PayPal"
                  name="paymentMethod"
                  onChange={(e) => handlePayment(e)}
                />
                PayPal (Cash on Delivery)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={infoOrders.paymentMethod === 'Klarna'}
                  value="Klarna"
                  name="paymentMethod"
                  onChange={(e) => handlePayment(e)}
                />
                Klarna
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border rounded-xl p-4 bg-white h-fit">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$0</span>
            </div>

            <div className="border-t pt-3 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="text-red-500">{total}</span>
            </div>
          </div>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="mt-6 w-full py-4 rounded-md bg-black text-white font-semibold
             disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xử lý...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
