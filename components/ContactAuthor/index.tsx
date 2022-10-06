/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import { IAuthor } from "../../interfaces/author";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const ContactAuthor = ({ author }: { author: IAuthor }) => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Typography level="h4" textAlign="center">
        Contacter {author.firstName}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <FormControl>
        <FormLabel>Informations envoyées avec le message</FormLabel>
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

      <Button fullWidth sx={{ mt: 2 }}>
        Envoyer le message
      </Button>
    </>
  );
};
