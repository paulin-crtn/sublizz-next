/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import format from "date-fns/format";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { ILease, ILeaseDetail } from "../../../interfaces/lease";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

/* -------------------------------------------------------------------------- */
/*                             FUNCTION COMPONENT                             */
/* -------------------------------------------------------------------------- */
const LeaseDates = ({
  lease,
  size = "sm",
  level = "body2",
  fullDate = false,
  withDecorator = false,
  showFlexible = false,
}: {
  lease: ILease | ILeaseDetail;
  size?: "sm" | "md" | "lg";
  level?: "body2" | "body1" | "h6" | "h5";
  fullDate?: boolean;
  withDecorator?: boolean;
  showFlexible?: boolean;
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
            level={level}
            startDecorator={<EventAvailableIcon />}
            sx={{
              color: size === "sm" ? "text.secondary" : "#ffffff",
              "--Typography-gap": "8px",
            }}
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
            level={level}
            startDecorator={withDecorator ? <EventAvailableIcon /> : undefined}
            sx={{
              color: size === "sm" ? "text.secondary" : "#ffffff",
              "--Typography-gap": "8px",
            }}
          >
            Du {isClient && format(new Date(lease.startDate), "dd MMMM uuuu")}{" "}
            au {isClient && format(new Date(lease.endDate), "dd MMMM uuuu")}
            {!!lease.isDateFlexible && showFlexible && (
              <Chip
                component="span"
                color="neutral"
                variant="soft"
                size={size}
                sx={{ marginLeft: 1 }}
              >
                Dates flexibles
              </Chip>
            )}
          </Typography>
        )}

        {lease.endDate && !fullDate && (
          <Typography
            fontWeight={300}
            level={size === "sm" ? "body2" : "h5"}
            startDecorator={withDecorator ? <EventAvailableIcon /> : undefined}
            sx={{
              color: size === "sm" ? "text.secondary" : "#ffffff",
              "--Typography-gap": "8px",
            }}
          >
            {isClient && format(new Date(lease.startDate), "dd MMM uuuu")} -{" "}
            {isClient && format(new Date(lease.endDate), "dd MMM uuuu")}
            {!!lease.isDateFlexible && showFlexible && (
              <Chip
                component="span"
                color="neutral"
                variant="soft"
                size={size}
                sx={{ marginLeft: 1 }}
              >
                Dates flexibles
              </Chip>
            )}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LeaseDates;
