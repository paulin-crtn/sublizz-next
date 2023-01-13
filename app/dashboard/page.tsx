"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMemo } from "react";
import { useRouter } from "next/navigation";
/* ------------------------------- COMPONENTS ------------------------------- */
import { useAuth } from "../../utils/context/auth.context";
import CustomBreadcrumbs from "./components/custom-beadcrumbs";
import DashboardCard from "./components/dashboard-card";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { Add } from "@mui/icons-material";
/* -------------------------------- CONSTANTS ------------------------------- */
import { UserRoleEnum } from "../../enum/UserRoleEnum";
import { DASHBOARD_ITEMS } from "../../data/dashboardItems";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

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

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={4}
      >
        <CustomBreadcrumbs currentPage="Tableau de bord" />
        <Button
          color="info"
          startDecorator={<Add />}
          onClick={() => {
            router.push("/dashboard/leases/new");
          }}
        >
          Publier une annonce
        </Button>
      </Box>
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
    </>
  );
}
