import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PL-300 Practice Exam',
  description: 'Realistic PL-300 practice exams with a complete source-matched question bank.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
