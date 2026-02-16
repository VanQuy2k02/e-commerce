import { handleOrders } from '@/service/orders';
import PaymentSuccessUI from '../PaymentSuccessUI';

export default async function OrderSuccessPageUI({ params }: { params: { id: number } }) {
  const { id } = await params;
  if (!id) return;
  const res = await handleOrders.getDetailOrders(id);
  return (
    <div>
      <PaymentSuccessUI order={res.data} />
    </div>
  );
}
