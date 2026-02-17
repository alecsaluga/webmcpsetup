import Script from 'next/script'

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-5T2DN6KNVG"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5T2DN6KNVG');
        `}
      </Script>
    </>
  )
}
