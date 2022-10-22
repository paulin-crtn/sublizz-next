/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const store = async (formData: FormData): Promise<string> => {
  const response = await fetch("/api/supabase/store-profile-picture", {
    method: "POST",
    body: formData,
    // headers: 'Content-Type' should be omit when sending a FormData
  });
  return await response.json();
};

export const destroy = async (fileName: string): Promise<void> => {
  const response = await fetch("/api/supabase/destroy-profile-picture", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([fileName]),
  });
  return await response.json();
};
