/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import { useAuth } from "../../../context/auth.context";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserLeases: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <AccountLayout title="Annonces">
      <div>
        <h4>Annonces actives</h4>
        <h4>Annonces contactées</h4>
      </div>
    </AccountLayout>
  );
};

export default UserLeases;
