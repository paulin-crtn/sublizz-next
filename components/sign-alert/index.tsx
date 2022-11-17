/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction } from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const SignAlert = ({
  setOpenSignAlert,
  setOpenSignin,
  setOpenSignup,
}: {
  setOpenSignAlert: Dispatch<SetStateAction<boolean>>;
  setOpenSignup: Dispatch<SetStateAction<boolean>>;
  setOpenSignin: Dispatch<SetStateAction<boolean>>;
}) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box>
      <List
        aria-labelledby="list-why-create-an-account"
        sx={{
          marginTop: 2,
          marginBottom: 3,
        }}
      >
        <ListItem
          sx={{
            minBlockSize: 0,
            paddingBlockStart: 0,
            paddingBlockEnd: 0,
          }}
        >
          <ListItemDecorator sx={{ fontSize: "1.4rem" }}>🗂️</ListItemDecorator>
          Publiez jusqu'à 2 annonces
        </ListItem>
        <ListItem
          sx={{
            minBlockSize: 0,
            paddingBlockStart: 0,
            paddingBlockEnd: 0,
          }}
        >
          <ListItemDecorator sx={{ fontSize: "1.4rem" }}>📮</ListItemDecorator>
          Répondez à toutes les annonces
        </ListItem>
        <ListItem
          sx={{
            minBlockSize: 0,
            paddingBlockStart: 0,
            paddingBlockEnd: 0,
          }}
        >
          <ListItemDecorator sx={{ fontSize: "1.4rem" }}>💙</ListItemDecorator>
          Sauvegardez vos favoris
        </ListItem>
        <ListItem
          sx={{
            minBlockSize: 0,
            paddingBlockStart: 0,
            paddingBlockEnd: 0,
          }}
        >
          <ListItemDecorator sx={{ fontSize: "1.4rem" }}>🫰</ListItemDecorator>
          Gratuit et sans spam
        </ListItem>
      </List>
      <Button
        fullWidth
        onClick={() => {
          setOpenSignup(true);
          setOpenSignAlert(false);
        }}
        sx={{ mb: 1 }}
      >
        Créer un compte
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          setOpenSignin(true);
          setOpenSignAlert(false);
        }}
      >
        Se connecter
      </Button>
    </Box>
  );
};

export default SignAlert;
