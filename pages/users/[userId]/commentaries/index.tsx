// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// apollo
import client from "../../../../apollo-client";
import { GET_CONTENT_CREATOR } from "../../../../graphql/users/profile";

// componenets
import CommentariesContent from "../../../../layouts/home-page-content/mobile/commentaries-content";

// helpers
import { Tuser } from "../index";

const Index = () => {
   const router = useRouter();
   const user_id = router.query.userId;

   const [user, userState] = useState<Tuser | null>(null);

   const getUserData = async () => {
      try {
         const { data } = await client.query({
            query: GET_CONTENT_CREATOR,
            variables: { ID: user_id }
         });
         if (data.users && data.users.length > 0) {
            userState(data.users[0]);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getUserData();
   }, []);

   return <div>{user && <CommentariesContent user={user} />}</div>;
};

export default Index;
