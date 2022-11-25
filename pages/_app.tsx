/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import setDefaultOptions from "date-fns/setDefaultOptions";
import fr from "date-fns/locale/fr";
import { AuthProvider } from "../context/auth.context";
import { FavoriteProvider } from "../context/favorite.context";
import { theme } from "../theme";
import Layout from "../components/layout";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import CookieBanner from "../components/cookie-banner";
import CssBaseline from "@mui/joy/CssBaseline";
import Head from "next/head";

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
          <Layout>
            <Toaster position="bottom-right" />
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <FavoriteProvider>
              <Component {...pageProps} />
            </FavoriteProvider>
            {/** Cookie */}
            <Modal open={openCookie}>
              <ModalDialog
                size="lg"
                aria-labelledby="cookie-modal"
                sx={{ maxWidth: 550 }}
              >
                <CookieBanner setOpenCookie={setOpenCookie} />
              </ModalDialog>
            </Modal>
          </Layout>
        </AuthProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}
