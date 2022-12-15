/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import Image from "next/image";
/* ----------------------------------- MUI ---------------------------------- */
import ScheduleIcon from "@mui/icons-material/Schedule";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
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
    <Card variant="outlined">
      <CardOverflow>
        <AspectRatio ratio="1.8">
          <Image
            src={"/img/" + imgName}
            alt="illustration lease type"
            fill={true}
            style={{ objectFit: "cover" }}
            sizes={"600px"}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ marginY: 3 }}>
        <Typography component="h4" level="h5" fontWeight={600}>
          {title}
        </Typography>
        <Typography level="body2" marginBottom={2}>
          {info}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
      <CardOverflow
        variant="soft"
        sx={{
          py: 1.5,
          bgcolor: "background.level1",
        }}
      >
        <Typography
          fontWeight={300}
          level="body2"
          startDecorator={<ScheduleIcon />}
          sx={{ color: "text.secondary", "--Typography-gap": "8px" }}
        >
          {duration}
        </Typography>
      </CardOverflow>
    </Card>
  );
};

export default LeaseType;
