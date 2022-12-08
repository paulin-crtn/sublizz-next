"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { PropsWithChildren, useMemo } from "react";
import { usePathname } from "next/navigation";
/* ------------------------------- COMPONENTS ------------------------------- */
import Navbar from "../navbar";
import Footer from "../footer";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  /* ------------------------------- NEXT ROUTER ------------------------------ */
  const pathname = usePathname();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box sx={{ flex: "1 0 auto" }}>{children}</Box>
      {/** Remove footer on /leases and /messages page */}
      {withFooter && <Footer />}
    </Box>
  );
};

export default AppLayout;
