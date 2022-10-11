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
    <Box display="flex" alignItems="stretch" minHeight="calc(100vh - 300px)">
      <Box margin="auto">
        <Typography component="h1" level="h1" marginBottom={1}>
          Accès refusé
        </Typography>
        <Typography component="h2" level="h4" fontWeight={300}>
          Vous devez vous connecter pour accéder à cette page
        </Typography>
      </Box>
    </Box>
  );
};

export default AccessDenied;
