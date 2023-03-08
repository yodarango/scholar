import { client } from "../../../apollo-client";
import { NEW_TRUSTED_USER_REQUEST } from "../../../graphql/feedback/users";

export type Tvariables = {
   timeInMinistry: boolean;
   bibleEducation: boolean;
   ministry: string;
   degree: string;
   church: string;
   f_name: string;
   l_name: string;
   age: boolean;
};

export const handleBecomeTrusteduser = async (variables: Tvariables) => {
   try {
      const { data } = await client.mutate({
         mutation: NEW_TRUSTED_USER_REQUEST,
         variables
      });
      if (data.trusted_user_application) return { data, status: "done" };
      else return { data: null, status: "error" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "done" };
   }
};
