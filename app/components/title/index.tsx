import Typography from "@mui/joy/Typography";

const Title = ({ text }: { text: string }) => {
  return (
    <Typography
      level="h3"
      fontSize="2.1rem"
      fontWeight={600}
      sx={{
        width: "fit-content",
        marginBottom: "45px",
        "@media (max-width: 800px)": {
          fontSize: "1.8rem",
        },
      }}
    >
      {text}
    </Typography>
  );
};

export default Title;
