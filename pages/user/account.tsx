/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useAuth } from "../../context/auth.context";
import AccountLayout from "../../components/account-layout";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserAccount: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <div>Access denied</div>;
  }
  return <AccountLayout title="Compte">Email</AccountLayout>;
};

export default UserAccount;
