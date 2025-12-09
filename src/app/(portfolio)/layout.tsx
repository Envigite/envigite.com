import { Header } from '@/components/layout/Header';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative">{children}</main>
    </>
  );
}
