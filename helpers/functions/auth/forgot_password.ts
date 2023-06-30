import { client } from "../../../apollo-client";
import {
   SET_NEW_PASSWORD,
   VERIFY_EMAIL_EXISTS,
   VERIFY_FORGOTTEN_PASSWORD_CODE
} from "../../../graphql/users/authenticate_user";
import { VERIFY_ACCOUNT } from "../../../graphql/users/new_user";

export const verifyEmail = async (email: string) => {
   try {
      const { data } = await client.mutate({
         mutation: VERIFY_EMAIL_EXISTS,
         variables: { email }
      });

      if (data.verify_email_exists === 0) {
         return false;
      } else if (data.verify_email_exists > 0) {
         return true;
      }
   } catch (error) {
      console.error(error);
      return false;
   }
};

export const verificationCode = async (code: string, isForgottenPassword: boolean = true) => {
   const QUERY = isForgottenPassword ? VERIFY_FORGOTTEN_PASSWORD_CODE : VERIFY_ACCOUNT;
   try {
      const { data } = await client.mutate({
         mutation: QUERY,
         variables: {
            verification_code: code
         }
      });

      const key = Object.keys(data)[0];

      if (
         (data.verify_account && data[key].__typename === "NewSession") ||
         data.forgotten_password_code
      ) {
         return data[key];
      } else {
         return false;
      }
   } catch (error) {
      console.error(error);
      return false;
   }
};

export const changePassword = async (
   new_password: string,
   verification_code?: string | number,
   current_password?: string
) => {
   try {
      const { data } = await client.mutate({
         mutation: SET_NEW_PASSWORD,
         variables: {
            new_password,
            current_password,
            verification_code
         }
      });

      if (data.new_password?.__typename === "UserUpdated") {
         return true;
      } else if (data.new_password?.__typename === "IncorrecctCredentials") {
         return false;
      }
   } catch (error) {
      console.error(error);
      return false;
   }
};
