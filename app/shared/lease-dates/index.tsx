/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import format from "date-fns/format";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { ILease, ILeaseDetail } from "../../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                             FUNCTION COMPONENT                             */
/* -------------------------------------------------------------------------- */
const LeaseDates = ({
  lease,
  isMinimized = true,
}: {
  lease: ILease | ILeaseDetail;
  isMinimized?: boolean;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [isClient, setIsClient] = useState<boolean>(false);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Display dates on CLIENT SIDE ONLY in order to avoid hydration error.
   * This is because server and client might have a different timezone.
   */
  useEffect(() => setIsClient(true), []);

  /* -------------------------------- CONSTANTS ------------------------------- */
  const marginTop = isMinimized ? 0.5 : 1;
  const marginBottom = isMinimized ? 2 : 3;
  const marginRight = isMinimized ? 1 : 2;

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        mb: marginBottom,
      }}
    >
      <Box marginTop={marginTop} marginRight={marginRight}>
        {!lease.endDate && (
          <Typography level={isMinimized ? "body1" : "h5"} fontWeight={300}>
            À partir du{" "}
            {isClient &&
              format(
                new Date(lease.startDate),
                isMinimized ? "dd MMM uuuu" : "dd MMMM uuuu"
              )}
          </Typography>
        )}
        {lease.endDate && (
          <Typography level={isMinimized ? "body1" : "h5"} fontWeight={300}>
            Du{" "}
            {isClient &&
              format(
                new Date(lease.startDate),
                isMinimized ? "dd MMM uuuu" : "dd MMMM uuuu"
              )}{" "}
            au{" "}
            {isClient &&
              format(
                new Date(lease.endDate),
                isMinimized ? "dd MMM uuuu" : "dd MMMM uuuu"
              )}
          </Typography>
        )}
      </Box>
      {!!lease.isDateFlexible && (
        <Chip
          variant="soft"
          color="neutral"
          size={isMinimized ? "sm" : "md"}
          sx={{ mt: marginTop }}
        >
          Dates flexibles
        </Chip>
      )}
    </Box>
  );
};

export default LeaseDates;
