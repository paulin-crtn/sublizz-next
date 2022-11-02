/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Box } from "@mui/joy";
import { PropsWithChildren } from "react";
import Footer from "../footer";
import Navbar from "../navbar";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Layout: React.FC<PropsWithChildren> = ({ children }) => {
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
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "45px 30px 90px 30px",
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
