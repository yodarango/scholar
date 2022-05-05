import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// graphQL
import client from "../../../../apollo-client";
import { GET_ONE_SERMON_NOTE } from "../../../../graphql/posts/sermon_notes";

// child comps
import EditSermonNotesPost from "../../../../posts/edit-posts/edit-sermon-note-post";
import NavigationMenu from "../../../../layouts/navigation-menu";

// helpers / types
import { GetServerSideProps } from "next";
import { TsermonPost } from "../../../../posts/sermon-notes-post";

type editCommentaryProps = {
   sermonPost: TsermonPost;
};
const EditSermonNote = ({ sermonPost }: editCommentaryProps) => {
   return (
      <>
         {sermonPost && (
            <div className='main-wrapper'>
               <EditSermonNotesPost sermonPost={sermonPost} />
            </div>
         )}
         {!sermonPost && <div>this comment does not exists anymore! #NEEDS_GRAPHICS</div>}
         <NavigationMenu />
      </>
   );
};

export default EditSermonNote;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
   const postId = query.id ? query.id[0] : 0;
   const { data } = await client.query({
      query: GET_ONE_SERMON_NOTE,
      variables: { ID: postId }
   });
   console.log(data.sermon_notes[0]);
   return {
      props: { sermonPost: data.sermon_notes[0] || null }
   };
};
