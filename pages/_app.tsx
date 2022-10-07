/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import "../styles/globals.css";
import { theme } from "../theme";
import Layout from "../components/layout";

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM APP                                 */
/* -------------------------------------------------------------------------- */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CssVarsProvider>
  );
}
