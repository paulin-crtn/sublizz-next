/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { customFetch } from "../utils/fetch/customFetch";
import { IFavorite } from "../interfaces/IFavorite";
import { TOAST_STYLE } from "../const/toastStyle";
import { useAuth } from "./auth.context";
import {
  getUnreadConversations,
  setConversationAsRead,
} from "../utils/fetch/fetchConversation";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IConversationContext {
  unread: string[];
  markAsRead: (id: string) => void;
}

/* -------------------------------------------------------------------------- */
/*                                AUTH CONTEXT                                */
/* -------------------------------------------------------------------------- */
const ConversationContext = createContext<IConversationContext>({
  unread: [],
  markAsRead: (id: string) => {},
});

/* -------------------------------------------------------------------------- */
/*                                AUTH PROVIDER                               */
/* -------------------------------------------------------------------------- */
export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [unread, setUnread] = useState<string[]>([]);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    if (user) {
      getUnreadConversations()
        .then((unread) => {
          setUnread(unread);
          console.log(unread);
        })
        .catch((error) => console.error(error));
    } else {
      setUnread([]);
    }
  }, [user]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const markAsRead = async (conversationId: string) => {
    if (!unread.includes(conversationId)) {
      return;
    }
    try {
      await setConversationAsRead(conversationId);
      setUnread((prevState: string[]) =>
        prevState.filter((id: string) => id !== conversationId)
      );
    } catch (err) {
      toast.error("Une erreur est survenue", {
        style: TOAST_STYLE,
      });
    }
  };

  /* -------------------------------- PROVIDER -------------------------------- */
  return (
    <ConversationContext.Provider
      value={{
        unread,
        markAsRead,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                CONTEXT HOOK                                */
/* -------------------------------------------------------------------------- */
export const useConversation = () => useContext(ConversationContext);
