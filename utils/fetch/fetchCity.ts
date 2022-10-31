/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const getDataGouvCity = async (query: string) => {
  const response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom,population`,
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
