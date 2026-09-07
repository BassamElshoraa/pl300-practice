import type { Metadata } from 'next';
import './globals.css';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: 'PL-300 Practice Exam',
  description: 'Realistic PL-300 practice exams with a complete source-matched question bank.',
  applicationName: 'PL-300 Practice Exam Simulator',
  authors: [{ name: 'Bassam Elshoraa', url: 'https://www.linkedin.com/in/bassam-elshoraa/' }],
  creator: 'Bassam Elshoraa',
  icons: { icon: `${assetBase}/favicon.svg` },
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
