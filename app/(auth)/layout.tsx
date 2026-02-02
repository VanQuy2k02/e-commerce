import HeaderAuth from '@/components/layout/HeaderAuth';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <HeaderAuth />
      <main>{children}</main>
    </>
  );
}
