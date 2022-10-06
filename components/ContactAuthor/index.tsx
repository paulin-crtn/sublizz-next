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
import Input from "@mui/joy/Input";
import { IAuthor } from "../../interfaces/author";
import { Chip } from "@mui/joy";

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
        <Chip
          color="neutral"
          variant="soft"
          sx={{ fontWeight: 300, width: "min-content", mb: 1 }}
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
      </FormControl>

      <FormControl>
        <FormLabel>Message à envoyer</FormLabel>
        <Textarea variant="soft" minRows={4} />
      </FormControl>

      <Button fullWidth>Envoyer le message</Button>
    </>
  );
};
