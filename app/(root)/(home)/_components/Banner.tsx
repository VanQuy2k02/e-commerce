import Image from 'next/image';

export default function Banner() {
  return (
    <div className="px-4 py-4">
      <Image src="/images/banner.png" alt="banner_image" width={928} height={480} />
    </div>
  );
}
