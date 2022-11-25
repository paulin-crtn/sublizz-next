/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
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
export default function MyApp({ Component, pageProps }: AppProps) {
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
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppLayout>
            <Toaster position="bottom-right" />
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <Component {...pageProps} />
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
  );
}
