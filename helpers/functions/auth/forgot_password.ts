import { client } from "../../../apollo-client";
import { VERIFY_EMAIL_EXISTS } from "../../../graphql/users/authenticate_user";
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
      console.log(error);
      return false;
   }
};

export const verificationCode = async (code: string) => {
   try {
      const { data } = await client.mutate({
         mutation: VERIFY_ACCOUNT,
         variables: {
            verification_code: code
         }
      });
      if (data.verify_account && data.verify_account.__typename === "NewSession") {
         console.log(data.verify_account);

         const today = Date.now();
         const expTime = new Date(today + 1209600000);

         document.cookie = `authorization=${data.verify_account.token}; expires=${expTime}; path=/`;

         location.href = "/account_verification";
      } else if (data.verify_account.__typename === "IncorrectVerificatoinCode") {
         return false;
      } else {
         return false;
      }
   } catch (error) {
      console.log(error);
   }
};
