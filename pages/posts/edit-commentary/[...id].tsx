import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
// graphQL
import client from "../../../apollo-client";
import { GET_ONE_COMMENTARY } from "../../../graphql/posts/commentaries";

// child comps
import EditPost from "../../../posts/edit-posts/edit-commentary-post";

// helpers / types
import { Tcommentary } from "../../../posts/comment";

type editComentaryProps = {
   commentary: Tcommentary;
};
const EditCommentary = ({ commentary }: editComentaryProps) => {
   return (
      <>
         {commentary && (
            <div>
               <EditPost commentary={commentary} />
            </div>
         )}
         {!commentary && <div>this comment does not exists anymore!</div>}
      </>
   );
};

export default EditCommentary;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const postId = query.id ? query.id[0] : 0;
   const { data } = await client.query({
      query: GET_ONE_COMMENTARY,
      variables: { ID: postId, showComments: true }
   });
   return {
      props: { commentary: data.commentary[0] || null }
   };
};
