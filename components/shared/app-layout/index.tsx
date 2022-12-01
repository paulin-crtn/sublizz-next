/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { PropsWithChildren, useMemo } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const isFullwidth: boolean = useMemo(() => {
    const pathnameArr = router.pathname.split("/");
    const isHomePage = pathnameArr[1] === "";
    const isLeasePage = pathnameArr[1] === "leases" && pathnameArr.length === 3;
    const isLegalPages = pathnameArr[1] === "legal";
    return isHomePage || isLeasePage || isLegalPages;
  }, [router.pathname]);

  const withFooter: boolean = useMemo(() => {
    const pathnameArr = router.pathname.split("/");
    const isMessagesPage =
      pathnameArr[1] === "dashboard" && pathnameArr[2] === "messages";
    const isLeasesPage = pathnameArr[1] === "leases";
    if (isMessagesPage || isLeasesPage) {
      return false;
    }
    return true;
  }, [router.pathname]);

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
            maxWidth: isFullwidth ? "1600px" : "auto",
            margin: "0 auto",
            padding: isFullwidth ? "45px 90px 90px 90px" : 0,
            "@media (max-width: 840px)": {
              padding: isFullwidth ? "30px 50px 70px 50px" : 0,
            },
          }}
        >
          {children}
        </Box>
      </Box>
      {/** Remove footer on /leases and /messages page */}
      {withFooter && <Footer />}
    </Box>
  );
};

export default AppLayout;
