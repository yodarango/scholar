/***************************************************************************************** 
This function checks if a user is logged in or not. If the user is logged in, it redirects
to the redirect url passed in as a parameter. THe function takes in an object as a second
argument. The object has a key called check_is_auth. If the value of this key is true,
the function checks if the user is logged in and if it is false it checks if the
user is not logged in. The default is true.
******************************************/
import { useEffect, useState } from "react";
import { client } from "../apollo-client";
import { CHECK_AUTH } from "../graphql/users/users";
import { useLogout } from "./use_logout";
import { loggedInUser } from "../helpers/auth/get-loggedin-user";

type TUseCheckAuthProps = {
   redirect: string;
   children: any;
};

export const UseIsAuth = ({ redirect, children }: TUseCheckAuthProps) => {
   const [render, setRender] = useState(false);
   const check = async () => {
      try {
         const { data } = await client.query({
            query: CHECK_AUTH,
            variables: {}
         });

         if (!data.is_user_logged_in) {
            useLogout();
            location.href = redirect;
         } else {
            setRender(true);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      check();
   }, []);

   return <> {render && children}</>;
};

export const UseIsNotAuth = ({ redirect, children }: TUseCheckAuthProps) => {
   const [render, setRender] = useState(false);
   const check = async () => {
      try {
         const { data } = await client.query({
            query: CHECK_AUTH,
            variables: {}
         });

         if (data.is_user_logged_in === true) {
            location.href = redirect;
         } else {
            setRender(true);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      check();
   }, []);

   return <> {render && children}</>;
};
