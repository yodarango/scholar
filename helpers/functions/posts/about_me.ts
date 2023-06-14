import { useState } from "react";
import { client } from "../../../apollo-client";
import { UPDATE_ABOUT_ME } from "../../../graphql/users/profile";
import { notificationMessages } from "../../../data/notification_messages";
import { errorMessages } from "../../../data/error_messages";
const { aboutMeSaved } = notificationMessages;
const {
   account: { unableToUpdateAboutMe }
} = errorMessages;

export const useAboutMe = () => {
   const [loading, setloading] = useState(false);
   const [data, setdata] = useState<any>();
   const [error, seterror] = useState<any>(null);

   const save = async (body: string) => {
      setloading(true);
      try {
         const { data } = await client.mutate({
            mutation: UPDATE_ABOUT_ME,
            variables: { body }
         });

         if (data?.update_about_me) {
            setdata({ ...aboutMeSaved, type: "2" });
            setloading(false);
            seterror(null);
         } else {
            setdata({ ...unableToUpdateAboutMe, type: "4" });
            setloading(false);
            seterror(null);
         }
      } catch (error) {
         setdata({ ...unableToUpdateAboutMe, type: "4" });
         setloading(false);
         seterror(error);
      }
   };

   return {
      loading,
      data,
      setdata, // to close modals
      error,
      save
   };
};
