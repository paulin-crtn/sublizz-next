/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Image, { StaticImageData } from "next/image";
/* ----------------------------------- MUI ---------------------------------- */
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CityCard = ({ name, img }: { name: string; img: StaticImageData }) => {
  return (
    <Card sx={{ minHeight: "280px" }}>
      <CardCover>
        <Image src={img} alt="city illustration" placeholder="blur" />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 100px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography
          component="h5"
          fontSize="1.3rem"
          textColor="#fff"
          startDecorator={<LocationOnRoundedIcon />}
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CityCard;
