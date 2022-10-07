/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import AccountLayout from "../../../components/account-layout";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserLeases: NextPage = () => {
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
