/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import { FunctionComponent } from "react";
import { ILease, ILeaseDetail } from "../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                             FUNCTION COMPONENT                             */
/* -------------------------------------------------------------------------- */
export const LeaseChips: FunctionComponent<{
  lease: ILease | ILeaseDetail;
}> = ({ lease }) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Chip
        size="sm"
        sx={{ mr: 0.75, color: "#ffffff", backgroundColor: "#000000" }}
      >
        {lease.type}
      </Chip>
      <Chip
        variant="outlined"
        size="sm"
        sx={{
          mr: 0.75,
          color: "#000000",
          backgroundColor: "#ffffff",
          borderColor: "#000000",
        }}
      >
        {lease.room} pièces
      </Chip>
      <Chip
        variant="outlined"
        size="sm"
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
