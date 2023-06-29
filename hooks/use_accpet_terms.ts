import { useState } from "react";
import { ACCEPT_TERMS } from "../graphql/users/users";
import { client } from "../apollo-client";

export const useAcceptTerms = () => {
   const [data, setData] = useState(null);
   const [status, setStatus] = useState("loading");
   const [error, setError] = useState<any>(null);

   const acceptTerms = async () => {
      try {
         const { data } = await client.mutate({
            mutation: ACCEPT_TERMS,
            variables: {}
         });

         if (data) {
            setData(data.accept_intro_terms);
            setStatus("done");
         } else {
            setData(null);
            setStatus("error");
         }
      } catch (error) {
         setError(error);
         console.error(error);
      }
   };

   return { data, status, error, acceptTerms };
};
