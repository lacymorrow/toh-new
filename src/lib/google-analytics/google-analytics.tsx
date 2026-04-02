import Script from "next/script";
import { env } from "@/env";

export const GoogleAnalytics = () => {
  if (!env.NEXT_PUBLIC_FEATURE_GOOGLE_ANALYTICS_ENABLED) {
    return null;
  }

  const gaId = env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
};
