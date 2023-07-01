import { useState } from "react";
import { ACCEPT_TERMS } from "../graphql/users/users";
import { client } from "../apollo-client";

export const useAcceptTerms = async () => {
   try {
      const { data } = await client.mutate({
         mutation: ACCEPT_TERMS,
         variables: {}
      });

      if (data) {
         return { data: data.accept_intro_terms, status: "done", error: null };
      } else {
         return { data: null, status: "error", error: "error" };
      }
   } catch (error) {
      console.error(error);
      return { data: null, status: "error", error: error };
   }
};
