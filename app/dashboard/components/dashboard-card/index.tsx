/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Link from "next/link";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const DashboardCard = ({
  icon,
  title,
  description,
  href,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <Link href={href}>
      <Box
        sx={{
          display: "flex",
          paddingX: 3,
          paddingY: 2.5,
          height: "100%",
          border: "1px solid #272930", // JoyUI
          borderRadius: "12px",
          lineHeight: "1.4rem",
          cursor: "pointer",
        }}
      >
        <Box>
          <Typography lineHeight="inherit" level="h6" startDecorator={icon}>
            {title}
          </Typography>
          <Typography
            lineHeight="inherit"
            mt={1.5}
            sx={{ color: "text.secondary" }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default DashboardCard;
