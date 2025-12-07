import { Header } from '@/components/layout/Header';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative pt-20">{children}</main>
    </>
  );
}
