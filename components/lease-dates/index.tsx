/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import format from "date-fns/format";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import { ILease, ILeaseDetail } from "../../interfaces/lease";
import Typography from "@mui/joy/Typography";

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
            {format(
              new Date(lease.startDate),
              isMinimized ? "dd MMM uuuu" : "dd MMMM uuuu"
            )}
          </Typography>
        )}
        {lease.endDate && (
          <Typography level={isMinimized ? "body1" : "h5"} fontWeight={300}>
            Du{" "}
            {format(
              new Date(lease.startDate),
              isMinimized ? "dd MMM uuuu" : "dd MMMM uuuu"
            )}{" "}
            au{" "}
            {format(
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
