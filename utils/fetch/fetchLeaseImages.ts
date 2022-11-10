/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const storeLeaseImages = async (
  formData: FormData
): Promise<string[]> => {
  const response = await fetch("/api/supabase/lease-images/store", {
    method: "POST",
    body: formData,
    // headers: 'Content-Type' should be omit when sending a FormData
  });
  return await response.json();
};

export const destroyLeaseImages = async (
  fileNames: string[]
): Promise<void> => {
  const response = await fetch("/api/supabase/lease-images/destroy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fileNames),
  });
  return await response.json();
};
