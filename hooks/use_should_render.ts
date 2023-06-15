/*********************************************************************************************
This component gets the user token from the local storage and it receives a user ID as a 
parameter in the user ID in the token is equal to the userId in the function parameter 
it will return true. 

Use this for components that do not require a lot of safety in the front end. For example, 
rendering a "create new content" button or Update/ Delete operations on a post. 
Because these components need authentication in the backend to execute their
calls anyway, there is no need to get live data from the database to check 
if the token is valid.
***********************
*/

import { useEffect, useState } from "react";
import { loggedInUser } from "../helpers/auth/get-loggedin-user";

export const useShouldRender = (userId: number) => {
   const [shouldRender, setShouldRender] = useState(false);

   useEffect(() => {
      const token = loggedInUser();
      if (token && typeof token.ID === "number") {
         if (token.ID === userId) setShouldRender(true);
      }
   }, [userId]);

   return { shouldRender };
};
