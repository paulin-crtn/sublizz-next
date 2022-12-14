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
  size = "sm",
  fullDate = false,
  withDecorator = false,
}: {
  lease: ILease | ILeaseDetail;
  size?: "sm" | "md" | "lg";
  fullDate?: boolean;
  withDecorator?: boolean;
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
            level={size === "sm" ? "body2" : "h5"}
            startDecorator={<ScheduleIcon />}
            sx={{ color: size === "sm" ? "text.secondary" : "#ffffff" }}
          >
            À partir du{" "}
            {isClient &&
              format(
                new Date(lease.startDate),
                fullDate ? "dd MMMM uuuu" : "dd MMM uuuu"
              )}
          </Typography>
        )}
        {lease.endDate && fullDate && (
          <Typography
            fontWeight={300}
            level={size === "sm" ? "body2" : "h5"}
            startDecorator={withDecorator ? <ScheduleIcon /> : undefined}
            sx={{ color: size === "sm" ? "text.secondary" : "#ffffff" }}
          >
            Du{" "}
            {isClient &&
              format(
                new Date(lease.startDate),
                fullDate ? "dd MMMM uuuu" : "dd MMM uuuu"
              )}{" "}
            au{" "}
            {isClient &&
              format(
                new Date(lease.endDate),
                fullDate ? "dd MMMM uuuu" : "dd MMM uuuu"
              )}
          </Typography>
        )}
        {lease.endDate && !fullDate && (
          <Typography
            fontWeight={300}
            level={size === "sm" ? "body2" : "h5"}
            startDecorator={withDecorator ? <ScheduleIcon /> : undefined}
            sx={{ color: size === "sm" ? "text.secondary" : "#ffffff" }}
          >
            {isClient &&
              format(
                new Date(lease.startDate),
                fullDate ? "dd MMMM uuuu" : "dd MMM uuuu"
              )}{" "}
            -{" "}
            {isClient &&
              format(
                new Date(lease.endDate),
                fullDate ? "dd MMMM uuuu" : "dd MMM uuuu"
              )}
          </Typography>
        )}
      </Box>
      {!!lease.isDateFlexible && size !== "sm" && (
        <Chip color="neutral" variant="soft" size="md" sx={{ marginLeft: 2 }}>
          Dates flexibles
        </Chip>
      )}
    </Box>
  );
};

export default LeaseDates;
