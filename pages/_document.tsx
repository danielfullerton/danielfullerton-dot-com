import { Head, Html, Main, NextScript } from "next/document";

// Runs before paint to set the theme class and avoid a flash of the wrong
// theme. Inline scripts are permitted by the CSP (script-src 'unsafe-inline').
// Also add `js` before paint so the scroll-reveal hidden state only applies
// when JS is present (no-JS/crawlers see fully-visible content, no FOUC).
const themeScript = `(function(){document.documentElement.classList.add('js');try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/df.png" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
