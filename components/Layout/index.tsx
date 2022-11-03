/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { PropsWithChildren, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../navbar";
import Footer from "../footer";
import Box from "@mui/joy/Box";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  /* ------------------------------- NEXT ROUTER ------------------------------ */
  const router = useRouter();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const isDashboard: boolean = useMemo(
    () => router.pathname.split("/")[1] === "dashboard",
    [router.pathname]
  );

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
      <Box sx={{ flex: "1 0 auto" }}>
        <Box
          sx={{
            maxWidth: isDashboard ? "auto" : "1300px",
            padding: isDashboard ? "0" : "45px 30px 90px 30px",
            margin: "0 auto",
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
