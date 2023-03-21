import { TUser } from "../../types/user";
import { parseJwt } from "./decodeJWT";

export const loggedInUser: () => TUser | null = () => {
   const user: string | null = localStorage.getItem("auth");
   if (user) {
      const jwt = JSON.parse(user).auth;
      const decodedUser = parseJwt(jwt);
      return decodedUser;
   }
   return null;
};

export const loggedInStatus = () => {
   const user: string | null = localStorage.getItem("auth");
   if (user) {
      return true;
   }
   return false;
};
