// https://dev.to/doylecodes/making-alerts-for-a-web-app-41d6

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { createContext, ReactNode, useContext, useState } from "react";
import { AlertStatusEnum } from "../enum/AlertStatusEnum";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IAlertContext {
  alertStatus: AlertStatusEnum;
  alertText: string | null;
  success: (text: string, timeout?: number) => void;
  error: (text: string, timeout: number) => void;
  clear: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
const AlertContext = createContext<IAlertContext>({
  alertStatus: AlertStatusEnum.NONE,
  alertText: null,
  success: () => {},
  error: () => {},
  clear: () => {},
});

/* -------------------------------------------------------------------------- */
/*                                AUTH PROVIDER                               */
/* -------------------------------------------------------------------------- */
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [alertStatus, setAlertStatus] = useState<AlertStatusEnum>(
    AlertStatusEnum.NONE
  );
  const [alertText, setAlertText] = useState<string | null>(null);

  /* -------------------------------- PROVIDER -------------------------------- */
  return (
    <AlertContext.Provider
      value={{
        alertStatus,
        alertText,
        success: (text: string, timeout = 3000) => {
          setAlertText(text);
          setAlertStatus(AlertStatusEnum.SUCCESS);
          setTimeout(() => {
            setAlertStatus(AlertStatusEnum.NONE);
          }, timeout);
        },
        error: (text: string, timeout: number) => {
          setAlertText(text);
          setAlertStatus(AlertStatusEnum.DANGER);
          setTimeout(() => {
            setAlertStatus(AlertStatusEnum.NONE);
          }, timeout);
        },
        clear: () => setAlertStatus(AlertStatusEnum.NONE),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                CONTEXT HOOK                                */
/* -------------------------------------------------------------------------- */
export const useAlert = () => useContext(AlertContext);
