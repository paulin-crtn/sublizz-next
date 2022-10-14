/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/auth.context";
import { AlertProvider } from "../context/alert.context";
import { theme } from "../theme";
import Layout from "../components/layout";
import CustomAlert from "../components/custom-alert";
import "../styles/globals.css";

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
        <AlertProvider>
          <AuthProvider>
            <Layout>
              <CustomAlert />
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </AlertProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}
