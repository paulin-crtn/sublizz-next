/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Button from "@mui/joy/Button";
import { IAuthor } from "../../interfaces/author";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ContactAuthor = ({ author }: { author: IAuthor }) => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <FormControl>
        <FormLabel>Expéditeur</FormLabel>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Chip
            color="neutral"
            variant="soft"
            sx={{ fontWeight: 300, width: "min-content" }}
          >
            Bertrand
          </Chip>
          <Chip
            color="neutral"
            variant="soft"
            sx={{ fontWeight: 300, width: "min-content" }}
          >
            bertrand@gmail.com
          </Chip>
        </Box>
      </FormControl>

      <FormControl>
        <FormLabel>Message à envoyer</FormLabel>
        <Textarea variant="soft" minRows={5} />
      </FormControl>

      <Button fullWidth>Contacter {author.firstName}</Button>
    </>
  );
};

export default ContactAuthor;
