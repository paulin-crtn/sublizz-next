/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IDetailsSummary } from "../../interfaces/IDetailsSummary";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const DetailsSummary = ({ summary, details }: IDetailsSummary) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box
      component="details"
      sx={{
        position: "relative",
        paddingX: 3,
        paddingY: 2,
        border: "1px solid #dddee0",
        borderRadius: "12px",
      }}
    >
      <Box
        component="summary"
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          listStyle: "none",
          userSelect: "none",
          cursor: "pointer",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "58px",
          },
          /* Safari */
          "&::-webkit-details-marker": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h6" fontWeight={400}>
            {summary}
          </Typography>
          {isOpen ? <RemoveIcon /> : <AddIcon />}
        </Box>
      </Box>
      <Box marginTop={2}>
        {details.map((detail: string) => (
          <Typography marginTop={1} fontWeight={300}>
            {detail}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default DetailsSummary;
