/**************************************************************************************** 
This function checks if a user is logged in or not. If the user is logged in, it redirects
to the redirect url passed in as a parameter. THe function takes in an object as a second
argument. The object has a key called check_is_auth. If the value of this key is true,
the function checks if the user is logged in and if it is false it checks if the
user is not logged in. The default is true.
******************************************/
import { useEffect, useState } from "react";
import { client } from "../apollo-client";
import { CHECK_AUTH } from "../graphql/users/users";

const defaultOptions = { check_is_auth: true };

type TUseCheckAuthProps = {
   options?: { check_is_auth: boolean };
   redirect: string;
   children: any;
};
export const UseCheckAuth = ({
   redirect,
   options = defaultOptions,
   children
}: TUseCheckAuthProps) => {
   const [canContinue, setCanContinue] = useState(false);
   const check = async () => {
      try {
         const { data } = await client.query({
            query: CHECK_AUTH,
            variables: {}
         });

         if (options.check_is_auth !== data.is_user_logged_in) {
            location.href = redirect;
         } else {
            setCanContinue(true);
         }
      } catch (error) {
         console.error(error);
         setCanContinue(true);
      }
   };

   useEffect(() => {
      check();
   }, []);

   return <> {canContinue && children}</>;
};
