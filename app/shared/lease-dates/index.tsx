/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import format from "date-fns/format";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { ILease, ILeaseDetail } from "../../../interfaces/lease";
import ScheduleIcon from "@mui/icons-material/Schedule";

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

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Box>
        {!lease.endDate && (
          <Typography
            fontWeight={300}
            level={isMinimized ? "body2" : "h5"}
            startDecorator={<ScheduleIcon />}
            sx={{ color: isMinimized ? "text.secondary" : "initial" }}
          >
            À partir du{" "}
            {isClient &&
              format(
                new Date(lease.startDate),
                isMinimized ? "dd MMM uuuu" : "dd MMMM uuuu"
              )}
          </Typography>
        )}
        {lease.endDate && (
          <Typography
            fontWeight={300}
            level={isMinimized ? "body2" : "h5"}
            startDecorator={<ScheduleIcon />}
            sx={{ color: isMinimized ? "text.secondary" : "initial" }}
          >
            {isClient &&
              format(
                new Date(lease.startDate),
                isMinimized ? "dd MMM uuuu" : "dd MMMM uuuu"
              )}{" "}
            -{" "}
            {isClient &&
              format(
                new Date(lease.endDate),
                isMinimized ? "dd MMM uuuu" : "dd MMMM uuuu"
              )}
          </Typography>
        )}
      </Box>
      {!!lease.isDateFlexible && !isMinimized && (
        <Chip color="neutral" size={isMinimized ? "sm" : "md"}>
          Dates flexibles
        </Chip>
      )}
    </Box>
  );
};

export default LeaseDates;
