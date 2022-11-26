/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Image from "next/future/image";
/* ----------------------------------- MUI ---------------------------------- */
import ScheduleIcon from "@mui/icons-material/Schedule";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseType = ({
  title,
  description,
  duration,
  imgName,
  info,
}: {
  title: string;
  description: string;
  duration: string;
  imgName: string;
  info: string | undefined;
}) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <Image
            src={"/img/" + imgName}
            alt="illustration lease type"
            width={400}
            height={400}
          />
        </AspectRatio>
      </CardOverflow>
      <Box sx={{ marginY: 3 }}>
        <Typography component="h4" level="h5" fontWeight={600} marginBottom={2}>
          {title}
        </Typography>
        <Typography sx={{ mb: 3 }}>{description}</Typography>
        <Alert>{info}</Alert>
      </Box>
      <CardOverflow
        sx={{
          marginTop: "auto",
          py: 1.5,
          bgcolor: "background.level1",
        }}
      >
        <Typography
          level="body2"
          startDecorator={<ScheduleIcon />}
          sx={{ color: "text.secondary" }}
        >
          {duration}
        </Typography>
      </CardOverflow>
    </Card>
  );
};

export default LeaseType;
