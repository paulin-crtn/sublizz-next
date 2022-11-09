/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import ScheduleIcon from "@mui/icons-material/Schedule";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseType = ({
  title,
  description,
  duration,
  info,
}: {
  title: string;
  description: string;
  duration: string;
  info: string | undefined;
}) => {
  return (
    <Card variant="outlined" sx={{ height: "100%", boxShadow: "none" }}>
      <CardOverflow sx={{ padding: 0 }}>
        <Typography
          component="h4"
          level="h5"
          fontWeight={400}
          sx={{
            padding: 2,
            background: "#C33764" /* fallback for old browsers */,
            // @ts-ignore
            background:
              "-webkit-linear-gradient(to right, #0071b8, #5d00ff)" /* Chrome 10-25, Safari 5.1-6 */,
            // @ts-ignore
            background:
              "linear-gradient(to right, #0071b8, #5d00ff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
            color: "#ffffff",
            borderRadius: "12px 12px 0 0",
          }}
        >
          {title}
        </Typography>
      </CardOverflow>
      <Box sx={{ marginY: 3 }}>
        <Typography fontWeight={300} sx={{ mb: 2 }}>
          {description}
        </Typography>
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
