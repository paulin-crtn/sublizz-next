/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, PropsWithChildren } from "react";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{
  title: string;
}>;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const ModalLayout: FunctionComponent<Props> = ({ title, children }) => {
  /* ------------------------------- REACT STATE ------------------------------ */

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Typography level="h4" textAlign="center">
        {title}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {children}

      <Button fullWidth sx={{ mt: 2 }}>
        {title}
      </Button>
    </>
  );
};
