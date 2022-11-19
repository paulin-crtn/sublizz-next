/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import { convertLeaseType } from "../../utils/convertLeaseType";
import { ILease, ILeaseDetail } from "../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                             FUNCTION COMPONENT                             */
/* -------------------------------------------------------------------------- */
const LeaseChips = ({
  lease,
  size = "md",
}: {
  lease: ILease | ILeaseDetail;
  size?: "sm" | "md" | "lg";
}) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 0.75,
      }}
    >
      <Chip
        size={size}
        sx={{
          color: "#ffffff",
          backgroundColor: "#000000",
          borderColor: "#000000",
        }}
      >
        {convertLeaseType(lease.type)}
      </Chip>
      <Chip
        variant="outlined"
        size={size}
        sx={{
          color: "#000000",
          backgroundColor: "#ffffff",
          borderColor: "#000000",
        }}
      >
        {lease.room} {lease.room > 1 ? "pièces" : "pièce"}
      </Chip>
      <Chip
        variant="outlined"
        size={size}
        sx={{
          color: "#000000",
          backgroundColor: "#ffffff",
          borderColor: "#000000",
        }}
      >
        {lease.surface}m2
      </Chip>
    </Sheet>
  );
};

export default LeaseChips;
