/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Image from "next/future/image";
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
    <Card variant="outlined" sx={{ height: "100%", boxShadow: "none" }}>
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
        <Typography component="h4" level="h5" fontWeight={600} marginBottom={1}>
          {title}
        </Typography>
        <Typography sx={{ mb: 2 }}>{description}</Typography>
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
