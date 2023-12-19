import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '課題ログインフォーム',
  description: '課題のログインフォーム',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="gfDRxG60oJLUkuYFITtcQqdejzpUvF8-V_0YUlKqMAc" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
