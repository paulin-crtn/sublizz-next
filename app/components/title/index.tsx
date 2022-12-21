import Typography from "@mui/joy/Typography";
import { bitter } from "../../../utils/nextFont";

const Title = ({
  text,
  marginTop = "60px",
}: {
  text: string;
  marginTop?: string;
}) => {
  return (
    <Typography
      level="h3"
      fontSize="2.1rem"
      fontWeight={800}
      fontFamily={bitter.style.fontFamily}
      sx={{
        width: "fit-content",
        marginTop,
        marginBottom: "40px",
        backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 0.3em",
        backgroundPosition: "0 95%",
        paddingBottom: 1,
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
