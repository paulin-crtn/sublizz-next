/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useMemo } from "react";
/* ------------------------------- COMPONENTS ------------------------------- */
import { useAuth } from "../../utils/context/auth.context";
import AccessDenied from "../../components/public/access-denied";
import DashboardLayout from "../../components/dashboard/dashboard-layout";
import CustomBreadcrumbs from "../../components/dashboard/custom-beadcrumbs";
import DashboardCard from "../../components/dashboard/dashboard-card";
/* ----------------------------------- MUI ---------------------------------- */
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
  }, [user]);

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <DashboardLayout
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
    </DashboardLayout>
  );
};

export default DashboardPage;
