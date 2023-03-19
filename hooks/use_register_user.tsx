/**************************************************************************************** 
Registers a new user. returns the status and whether a the sue was register was 
registered 👨🏻
************/

import { STATUS_DONE, STATUS_ERROR } from "../constants/common";
import { errorMessages } from "../data/error_messages";
import { useUserAuth } from "./use_user_auth";
import { client } from "../apollo-client";
import { useState } from "react";
import { CREATE_NEW_USER } from "../graphql/users/new_user";

const {
   register: { failToRegister }
} = errorMessages;

export const useRegisterUser = (
   signature: string,
   password: string,
   email: string,
   setStatus: any
) => {
   const [response, setResponse] =
      useState<null | { title: string; body: string; type: string }>(null);
   const [user, setUser] = useState<boolean>(false);

   // handle the login
   const handleRegister = async () => {
      if (signature && password) {
         try {
            const { data } = await client.mutate({
               mutation: CREATE_NEW_USER,
               variables: {
                  signature: signature.toUpperCase(),
                  email: email.toLocaleLowerCase(),
                  password: password
               }
            });

            if (data?.create_new_user?.ID) {
               useUserAuth(data?.create_new_user.token);
            } else if (data?.create_new_user.message) {
               setResponse({
                  title: failToRegister.title,
                  body: data?.create_new_user.message,
                  type: "3"
               });
               setStatus(STATUS_ERROR);
               setUser(false);
            }
         } catch (error) {
            setResponse({
               title: failToRegister.title,
               body: failToRegister.body,
               type: "4"
            });
            setStatus(STATUS_ERROR);
            console.error(error);
            setUser(false);
         }
      }
   };

   return { user, response, handleRegister };
};
