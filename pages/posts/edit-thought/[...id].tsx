import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// graphQL
import client from "../../../apollo-client";
import { GET_ONE_THOUGHT } from "../../../graphql/posts/thoughts";

// child comps
import EditThoughtPost from "../../../posts/edit-posts/edit-thought-post";
import NavigationMenu from "../../../layouts/navigation-menu";

// helpers / types
import { Tthought } from "../../../posts/thought";
import { GetServerSideProps } from "next";

type editCommentaryProps = {
   thought: Tthought;
};
const EditCommentary = ({ thought }: editCommentaryProps) => {
   return (
      <>
         {thought && (
            <div className='main-wrapper'>
               <EditThoughtPost thought={thought} />
            </div>
         )}
         {!thought && <div>this comment does not exists anymore! #NEEDS_GRAPHICS</div>}
         <NavigationMenu />
      </>
   );
};

export default EditCommentary;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const postId = query.id ? query.id[0] : 0;
   const { data } = await client.query({
      query: GET_ONE_THOUGHT,
      variables: { ID: postId, showComments: true }
   });
   return {
      props: { thought: data.thought[0] || null }
   };
};
