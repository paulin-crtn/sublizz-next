/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction } from "react";
import Image from "next/future/image";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import signAlertImg from "../../public/img/sign-alert.jpg";

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
    <Box sx={{ display: "flex", padding: 0 }}>
      <Box
        sx={{
          flex: "0 0 230px",
          position: "relative",
        }}
      >
        <Image
          src={signAlertImg}
          loading="lazy"
          alt="photo of a building"
          fill={true}
          style={{ objectFit: "cover" }}
        />
        <CardCover
          sx={{
            background: "rgba(0,0,0,0.15)",
            borderRadius: "12px 0 0 12px",
          }}
        />
      </Box>
      <Box sx={{ flex: "1 1", padding: 3 }}>
        <Typography level="h4">Vous devez vous identifier</Typography>
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
            <ListItemDecorator sx={{ fontSize: "1.4rem" }}>
              🗂️
            </ListItemDecorator>
            Publiez jusqu'à 2 annonces
          </ListItem>
          <ListItem
            sx={{
              minBlockSize: 0,
              paddingBlockStart: 0,
              paddingBlockEnd: 0,
            }}
          >
            <ListItemDecorator sx={{ fontSize: "1.4rem" }}>
              📮
            </ListItemDecorator>
            Répondez à toutes les annonces
          </ListItem>
          <ListItem
            sx={{
              minBlockSize: 0,
              paddingBlockStart: 0,
              paddingBlockEnd: 0,
            }}
          >
            <ListItemDecorator sx={{ fontSize: "1.4rem" }}>
              💙
            </ListItemDecorator>
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
    </Box>
  );
};

export default SignAlert;
