/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useState } from "react";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
/* ------------------------------- INTERFACES ------------------------------- */
import { IDetailsSummary } from "../../../interfaces/IDetailsSummary";

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
      sx={(theme) => ({
        position: "relative",
        padding: 3,
        border: "1px solid",
        backgroundColor: theme.colorSchemes.dark.palette.neutral.softBg,
        borderColor: theme.colorSchemes.dark.palette.neutral.softBg,
        borderRadius: "12px",
      })}
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
            height: "100%",
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
          <Typography level="h6" fontWeight={500} marginRight={2}>
            {summary}
          </Typography>
          {isOpen ? <RemoveIcon /> : <AddIcon />}
        </Box>
      </Box>
      <Box marginTop={2}>
        {details.map((detail: string, index: number) => (
          <Typography
            key={index}
            marginTop={1}
            fontWeight={300}
            fontSize="1.1rem"
            lineHeight="1.8rem"
          >
            {detail}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default DetailsSummary;
