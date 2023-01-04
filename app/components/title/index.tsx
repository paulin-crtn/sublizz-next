import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

const Title = ({
  text,
  decorator,
}: {
  text: string;
  decorator?: React.ReactElement;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={3}
      sx={{
        marginBottom: "60px",
        width: "fit-content",
        fontSize: "2.1rem",
        "& > svg": {
          fontSize: "3rem",
        },
        "@media (max-width: 800px)": {
          fontSize: "1.8rem",
          "& > svg": {
            fontSize: "2.2rem",
          },
        },
      }}
    >
      {decorator && decorator}
      <Typography level="h3" fontWeight={600} sx={{ fontSize: "inherit" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default Title;
