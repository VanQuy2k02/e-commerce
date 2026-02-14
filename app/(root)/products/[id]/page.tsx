import InfoProduct from '@/components/common/InfoProduct';
import ReviewProduct from '@/components/common/ReviewProduct';

interface paramsProps {
  params: {
    id: string;
  };
}

export default async function DetailProduct({ params }: paramsProps) {
  const { id } = await params;

  return (
    <div className="max-w-[960px] mx-auto w-full">
      <InfoProduct productID={id} />
      <ReviewProduct productID={id} />
    </div>
  );
}
