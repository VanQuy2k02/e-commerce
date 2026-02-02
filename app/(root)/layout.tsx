import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
