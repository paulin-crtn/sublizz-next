/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import { AuthProvider } from "../context/auth.context";
import { AlertProvider } from "../context/alert.context";
import { theme } from "../theme";
import Layout from "../components/layout";
import CustomAlert from "../components/custom-alert";
import "../styles/globals.css";

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM APP                                 */
/* -------------------------------------------------------------------------- */

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <AuthProvider>
        <AlertProvider>
          <Layout>
            <CustomAlert />
            <Component {...pageProps} />
          </Layout>
        </AlertProvider>
      </AuthProvider>
    </CssVarsProvider>
  );
}
