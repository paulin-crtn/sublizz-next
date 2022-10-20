/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/auth.context";
import { theme } from "../theme";
import Layout from "../components/layout";
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
        <AuthProvider>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}
