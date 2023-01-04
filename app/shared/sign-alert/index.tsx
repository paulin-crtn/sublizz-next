/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction } from "react";
/* ----------------------------------- MUI ---------------------------------- */
import { Theme } from "@mui/joy";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import StyleIcon from "@mui/icons-material/Style";
import ForumIcon from "@mui/icons-material/Forum";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PaymentIcon from "@mui/icons-material/Payment";
import Chip from "@mui/joy/Chip";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const listStyle = (theme: Theme) => ({
  marginY: 0.75,
  minBlockSize: 0,
  paddingBlockStart: 0,
  paddingBlockEnd: 0,
  fontSize: "1.1rem",
  "& > span > svg": {
    marginRight: 2,
    padding: 0.75,
    fontSize: "2.2rem",
    color: "#000000",
    backgroundColor: theme.colorSchemes.dark.palette.primary.softBg,
    borderRadius: "8px",
  },
});

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
          width: "fit-content",
          marginTop: 2,
          marginBottom: 3,
          marginX: "auto",
        }}
      >
        <ListItem sx={listStyle}>
          <ListItemDecorator>
            <StyleIcon />
          </ListItemDecorator>
          Publiez plusieurs annonces
        </ListItem>
        <ListItem sx={listStyle}>
          <ListItemDecorator>
            <ForumIcon />
          </ListItemDecorator>
          Répondez à toutes les annonces
        </ListItem>
        <ListItem sx={listStyle}>
          <ListItemDecorator>
            <FavoriteIcon />
          </ListItemDecorator>
          Sauvegardez vos favoris
        </ListItem>
        <ListItem sx={listStyle}>
          <ListItemDecorator>
            <PaymentIcon />
          </ListItemDecorator>
          Gratuit et sans spam
          <Chip size="sm" variant="soft" color="neutral" sx={{ marginLeft: 1 }}>
            avec limitation
          </Chip>
        </ListItem>
      </List>
      <Button
        className="btn-primary-gradient"
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
        variant="soft"
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
