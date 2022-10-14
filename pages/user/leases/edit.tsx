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
const EditLease: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }
  return <AccountLayout title="Publier une annonce">Type</AccountLayout>;
};

export default EditLease;
