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
  return (
    <CssVarsProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FavoriteProvider>
            <Layout>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
          </FavoriteProvider>
        </AuthProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}
