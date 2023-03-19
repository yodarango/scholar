/**************************************************************************************** 
This function checks if a user is logged in or not. If the user is logged in, it redirects
to the redirect url passed in as a parameter. THe function takes in an object as a second
argument. The object has a key called check_is_auth. If the value of this key is true,
the function checks if the user is logged in and if it is false it checks if the
user is not logged in. The default is true.
******************************************/
import { client } from "../apollo-client";
import { CHECK_AUTH } from "../graphql/users/users";

const defaultOptions = { check_is_auth: true };

export const useCheckAuth = (redirect: string, options = defaultOptions) => {
   let canContinue = true;
   const check = async () => {
      try {
         const { data } = await client.query({
            query: CHECK_AUTH,
            variables: {}
         });

         if (options.check_is_auth !== data.is_user_logged_in) {
            location.href = redirect;
         }

         canContinue = options.check_is_auth === data.is_user_logged_in;
      } catch (error) {
         console.log(error);
      }
   };

   check();
   return { canContinue };
};
