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
        sx={(theme) => ({
          display: "flex",
          paddingX: 3,
          paddingY: 2.5,
          height: "100%",
          border: "3px solid",
          borderColor: theme.colorSchemes.dark.palette.neutral.softBg,
          borderRadius: "12px",
          lineHeight: "1.4rem",
          cursor: "pointer",
          transition: "background-color 0.5s",
          "&:hover": {
            backgroundColor: theme.colorSchemes.dark.palette.neutral.softBg,
          },
        })}
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
