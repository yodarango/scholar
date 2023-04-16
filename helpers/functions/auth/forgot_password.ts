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

export const verificationCode = async (code: string) => {
   try {
      const { data } = await client.mutate({
         mutation: VERIFY_FORGOTTEN_PASSWORD_CODE,
         variables: {
            verification_code: code
         }
      });

      if (data.forgotten_password_code > 0) {
         return data.forgotten_password_code;
      } else {
         return false;
      }
   } catch (error) {
      console.error(error);
      return false;
   }
};

export const changePassword = async (new_password: string, USER_ID: string | number) => {
   try {
      const { data } = await client.mutate({
         mutation: SET_NEW_PASSWORD,
         variables: {
            new_password,
            USER_ID
         }
      });

      if (data.recover_password > 0) {
         return true;
      } else {
         return false;
      }
   } catch (error) {
      console.error(error);
      return false;
   }
};
