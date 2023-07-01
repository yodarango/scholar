import { useState } from "react";
import { ACCEPT_TERMS, NEW_VERIFICATION_CODE } from "../graphql/users/users";
import { client } from "../apollo-client";

export const useSendNewVerificationCode = async () => {
   try {
      const query = await client.query({
         query: NEW_VERIFICATION_CODE,
         variables: {}
      });

      if (query.data?.new_verification_code) {
         return { data: query.data.new_verification_code, status: "done", error: null };
      } else {
         return { data: null, status: "error", error: "error" };
      }
   } catch (err) {
      console.error(err);
      return { data: null, status: "error", error: "error" };
   }
};
