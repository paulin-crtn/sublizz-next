"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useState } from "react";
import { Poppins, Bitter } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import setDefaultOptions from "date-fns/setDefaultOptions";
import fr from "date-fns/locale/fr";
/* --------------------------------- CONTEXT -------------------------------- */
import { AuthProvider } from "../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import AppLayout from "../components/shared/app-layout";
import CookiePreference from "../components/shared/cookie-preference";
/* ------------------------------ MUI & STYLES ------------------------------ */
import { CssVarsProvider } from "@mui/joy/styles";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import CssBaseline from "@mui/joy/CssBaseline";
import { theme } from "../theme";
import "../styles/globals.css";

/* -------------------------------------------------------------------------- */
/*                                    FONTS                                   */
/* -------------------------------------------------------------------------- */
export const bitter = Bitter({
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

/* -------------------------------------------------------------------------- */
/*                               DATE-FNS LOCALE                              */
/* -------------------------------------------------------------------------- */
setDefaultOptions({ locale: fr });

/* -------------------------------------------------------------------------- */
/*                                 REACT QUERY                                */
/* -------------------------------------------------------------------------- */
const queryClient = new QueryClient();

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM APP                                 */
/* -------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [openCookie, setOpenCookie] = useState<boolean>(false);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    const cookiePreferences: string | null = localStorage.getItem(
      "lacartesdeslogements_cookie_preferences"
    );
    if (!cookiePreferences) setOpenCookie(true);
  }, []);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <html lang="fr">
      <head>
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
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <AppLayout>
                <Toaster position="bottom-right" />
                {children}
                {/** Cookie */}
                <Modal open={openCookie}>
                  <ModalDialog
                    size="lg"
                    aria-labelledby="cookie-modal"
                    sx={{ maxWidth: 550 }}
                  >
                    <CookiePreference setOpenCookie={setOpenCookie} />
                  </ModalDialog>
                </Modal>
              </AppLayout>
            </AuthProvider>
          </QueryClientProvider>
        </CssVarsProvider>
      </body>
    </html>
  );
}
