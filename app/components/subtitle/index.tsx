import Typography from "@mui/joy/Typography";
import { FunctionComponent, PropsWithChildren } from "react";

const SubTitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Typography
      width="80%"
      marginBottom="45px"
      fontSize="1.4rem"
      lineHeight="2.2rem"
      fontWeight={300}
      sx={{
        "@media (max-width: 800px)": {
          width: "100%",
          fontSize: "1.2rem",
          lineHeight: "1.8rem",
        },
      }}
    >
      {children}
    </Typography>
  );
};

export default SubTitle;
