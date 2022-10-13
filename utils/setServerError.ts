const handleServerError = (
  error: unknown,
  setServerErrors: (arg: any) => void
) => {
  if (error instanceof Error) {
    setServerErrors([error.message]);
  } else if (error instanceof Array) {
    setServerErrors(error);
  } else if (typeof error === "string") {
    setServerErrors([error]);
  } else {
    setServerErrors(["Server error"]);
  }
};

export default handleServerError;
