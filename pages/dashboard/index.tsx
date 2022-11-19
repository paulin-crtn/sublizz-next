/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Link from "next/link";
import { useMemo } from "react";
/* ------------------------------- COMPONENTS ------------------------------- */
import { useAuth } from "../../context/auth.context";
import AccessDenied from "../../components/access-denied";
import AccountLayout from "../../components/account-layout";
import CustomBreadcrumbs from "../../components/custom-beadcrumbs";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
/* -------------------------------- CONSTANTS ------------------------------- */
import { UserRoleEnum } from "../../enum/UserRoleEnum";
import { DASHBOARD_ITEMS } from "../../data/dashboardItems";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const DashboardPage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const data = useMemo(() => {
    if (user && user.role === UserRoleEnum.SEEKER) {
      return DASHBOARD_ITEMS.filter(
        (item) => item.title.toLowerCase() !== "gérer mes annonces"
      );
    }
    if (user && user.role === UserRoleEnum.OWNER) {
      return DASHBOARD_ITEMS.filter(
        (item) => item.title.toLowerCase() !== "favoris"
      );
    }
    return DASHBOARD_ITEMS;
  }, [user, DASHBOARD_ITEMS]);

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <AccountLayout
      pageTitle="Tableau de bord"
      breadcrumbs={<CustomBreadcrumbs currentPage="Tableau de bord" />}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridColumnGap: "15px",
          gridRowGap: "15px",
          "@media (max-width: 1200px)": { gridTemplateColumns: "1fr" },
        }}
      >
        {data.map(({ icon, title, description, href }, index: number) => (
          <Box key={index} alignSelf="stretch">
            <DashboardCard
              icon={icon}
              title={title}
              description={description}
              href={href}
            />
          </Box>
        ))}
      </Box>
    </AccountLayout>
  );
};

export default DashboardPage;

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
          border: "1px solid #dddddd",
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
