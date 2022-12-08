/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ------------------------------- COMPONENTS ------------------------------- */
import { Providers } from "./providers";
/* ------------------------------ MUI & STYLES ------------------------------ */
import "../styles/globals.css";

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM APP                                 */
/* -------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <html lang="fr">
      <head>
        {/** Meta */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="UTF-8" />
        {/** Favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#4700cc"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
