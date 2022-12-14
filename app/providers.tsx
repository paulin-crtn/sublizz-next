"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import setDefaultOptions from "date-fns/setDefaultOptions";
import fr from "date-fns/locale/fr";
/* --------------------------------- CONTEXT -------------------------------- */
import { AuthProvider } from "../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import Navbar from "./shared/navbar";
import Footer from "./shared/footer";
import CookiePreference from "./shared/cookie-preference";
/* ------------------------------ MUI & STYLES ------------------------------ */
import { CssVarsProvider } from "@mui/joy/styles";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Box from "@mui/joy/Box";
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
/*                                  PROVIDERS                                 */
/* -------------------------------------------------------------------------- */
export function Providers({ children }: { children: React.ReactNode }) {
  /* ------------------------------- NEXT ROUTER ------------------------------ */
  const pathname = usePathname();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openCookie, setOpenCookie] = useState<boolean>(false);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    const cookiePreferences: string | null = localStorage.getItem(
      "lacartesdeslogements_cookie_preferences"
    );
    if (!cookiePreferences) setOpenCookie(true);
  }, []);

  /**
   * TEMPORARY FIX since update to NextJS 13 :
   * - Page is already scrolled by 90px (navbar height) when navigating
   * - Previous scroll position is applied to next page
   */
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  /* ------------------------------- REACT MEMO ------------------------------- */
  const withFooter: boolean = useMemo(() => {
    if (pathname) {
      const pathnameArr = pathname.split("/");
      const isMessagesPage =
        pathnameArr[1] === "dashboard" && pathnameArr[2] === "messages";
      const isLeasesPage =
        pathnameArr[1] === "leases" && pathnameArr.length === 2;
      if (isMessagesPage || isLeasesPage) {
        return false;
      }
    }
    return true;
  }, [pathname]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <CssVarsProvider
      theme={theme}
      defaultMode="dark"
      colorSchemeSelector="#dark-mode"
    >
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/** TOASTER */}
          <Toaster position="bottom-right" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/** NAVBAR */}
            <Navbar />
            {/** CONTENT */}
            <Box
              sx={{
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: "calc(100vh - 90px)",
              }}
            >
              {children}
            </Box>
            {/** FOOTER - except on /leases and /messages pages */}
            {withFooter && <Footer />}
          </Box>
          {/** COOKIE */}
          <Modal open={openCookie}>
            <ModalDialog
              size="lg"
              aria-labelledby="cookie-modal"
              sx={{ maxWidth: 550 }}
            >
              <CookiePreference setOpenCookie={setOpenCookie} />
            </ModalDialog>
          </Modal>
        </AuthProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}
