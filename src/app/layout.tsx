import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Benjamin Contreras | Portfolio',
  description: 'Desarrollador Full Stack y Arquitecto de Software',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.className} bg-slate-950 text-white antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
