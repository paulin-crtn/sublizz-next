/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import EditLease from "../../../components/edit-lease";
import { useAuth } from "../../../context/auth.context";
import CustomBreadcrumbs from "../../../components/custom-beadcrumbs";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLeasePage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
      <AccountLayout
        breadcrumbs={
          <CustomBreadcrumbs
            currentPage="Publier"
            prevPages={[
              {
                key: "new-lease",
                name: "Mes Annonces",
                href: "/dashboard/leases",
              },
            ]}
          />
        }
      >
        <EditLease lease={undefined} />
      </AccountLayout>
    </LocalizationProvider>
  );
};

export default EditLeasePage;
