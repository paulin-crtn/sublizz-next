/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const storeProfilePicture = async (
  formData: FormData
): Promise<string> => {
  const response = await fetch("/api/aws/profile-picture/store", {
    method: "POST",
    body: formData,
    // headers: 'Content-Type' should be omit when sending a FormData
  });
  return await response.json();
};

export const destroyProfilePicture = async (
  fileName: string
): Promise<void> => {
  const response = await fetch("/api/aws/profile-picture/destroy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([fileName]),
  });
  return await response.json();
};
