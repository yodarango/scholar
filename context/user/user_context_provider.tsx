import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../../helpers/functions/users/get_current_user";

const defaultUserContext: any = {
   is_patron: false,
   signature: "",
   id: 0
};

const UserContext = createContext(defaultUserContext);

const UserContextProvider = ({ children }: any) => {
   const [user, setUser] = useState<any>(null);

   const fetchUserData = async () => {
      try {
         const { data } = await getCurrentUser();

         if (data) setUser(data);
         else setUser("none");
      } catch (error) {
         console.error("Error fetching user data:", error);
      }
   };

   useEffect(() => {
      fetchUserData();
   }, []);

   const login = () => {};

   const logout = () => {};

   return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export { UserContextProvider, UserContext };
