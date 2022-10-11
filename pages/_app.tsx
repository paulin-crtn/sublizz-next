/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import { AuthProvider } from "../context/auth.context";
import { theme } from "../theme";
import Layout from "../components/layout";
import "../styles/globals.css";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface ICustomPageProps {
  isProtected: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM APP                                 */
/* -------------------------------------------------------------------------- */

export default function MyApp({
  Component,
  pageProps,
}: AppProps<ICustomPageProps>) {
  return (
    <CssVarsProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </CssVarsProvider>
  );
}
