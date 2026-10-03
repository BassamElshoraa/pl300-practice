import type { Metadata } from 'next';
import './globals.css';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const configuredAnalyticsId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '';
const analyticsId = /^G-[A-Z0-9]+$/.test(configuredAnalyticsId)
  ? configuredAnalyticsId
  : '';

export const metadata: Metadata = {
  title: 'PL-300 Practice Exam',
  description:
    'Realistic PL-300 practice exams with a complete source-matched question bank.',
  applicationName: 'PL-300 Practice Exam Simulator',
  authors: [
    {
      name: 'Bassam Elshoraa',
      url: 'https://www.linkedin.com/in/bassam-elshoraa/',
    },
  ],
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
      <body>
        {children}
        {analyticsId && (
          <script
            data-pl300-analytics="ga4"
            dangerouslySetInnerHTML={{
              __html: `if(navigator.doNotTrack!=='1'){window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted',functionality_storage:'granted',personalization_storage:'denied',security_storage:'granted'});window.gtag('js',new Date());window.gtag('config','${analyticsId}',{allow_google_signals:false,allow_ad_personalization_signals:false,ads_data_redaction:true,send_page_view:true});var script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id=${analyticsId}';document.head.appendChild(script)}`,
            }}
          />
        )}
        <script src="https://js.puter.com/v2/" defer data-pl300-puter="true" />
      </body>
    </html>
  );
}
