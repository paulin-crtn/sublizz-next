/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { IAddressForm } from "../components/address-form";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getDataGouvAddress = async (postCode: string, street: string) => {
  const encodedStreet = encodeURI(street);
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${encodedStreet}&postcode=${postCode}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};
