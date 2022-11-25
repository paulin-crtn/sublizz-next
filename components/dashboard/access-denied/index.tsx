/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Box, Typography } from "@mui/joy";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AccessDenied = () => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" alignItems="stretch" minHeight="calc(100vh - 180px)">
      <Box margin="auto">
        <Typography component="h1" level="h2" marginBottom={1}>
          L'accès à cette page est restreint
        </Typography>
        <Typography component="h2" level="h4" fontWeight={300}>
          Vous devez vous connecter pour accéder à cette page
        </Typography>
      </Box>
    </Box>
  );
};

export default AccessDenied;
