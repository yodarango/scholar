import { useState } from "react";
import { client } from "../../../apollo-client";
import { UPDATE_ABOUT_ME } from "../../../graphql/users/profile";

export const useAboutMe = () => {
   const [loading, setloading] = useState(false);
   const [data, setdata] = useState<any>();
   const [error, seterror] = useState<any>(null);

   const save = async (body: string) => {
      console.log(body);
      setloading(true);
      try {
         const { data } = await client.mutate({
            mutation: UPDATE_ABOUT_ME,
            variables: { body }
         });

         if (data?.update_about_me) {
            setdata(data.update_about_me);
            setloading(false);
            seterror(null);
         }
      } catch (error) {
         setdata(null);
         setloading(false);
         seterror(error);
      }
   };

   return {
      loading,
      data,
      error,
      save
   };
};
