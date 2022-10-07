/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ReportLease = ({ leaseId }: { leaseId: number }) => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <FormControl>
        <FormLabel>Motif</FormLabel>
        <Textarea variant="soft" minRows={3} />
      </FormControl>

      <Button fullWidth>Signaler l'annonce</Button>
    </>
  );
};

export default ReportLease;
