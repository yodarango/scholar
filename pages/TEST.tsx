import client from "../apollo-client";
import { CREATE_NEW_COMMENTARY } from "../graphql/posts/commentaries";
import verses from "../data/commentaries/charles_hidge/ephesians.json";

const TEST = () => {
   const createPost = async (verseId: string, body: string, verse_citation: string) => {
      const { data } = await client.mutate({
         mutation: CREATE_NEW_COMMENTARY,
         variables: {
            VERSE_ID: verseId,
            body,
            category_tags: "",
            referenced_verses: "",
            verse_citation,
            is_private: false
         }
      });
   };

   let index = 0;
   const startComm = () => {
      const x = setInterval(() => {
         const curr = verses[index];
         index += 1;
         createPost(curr.VERSE_ID, curr.body, curr.verse_citation);
         console.log(`i: ${index}/${verses.length} v: ${verses[index].VERSE_ID}`);
         if (index > verses.length) {
            clearInterval(x);
         }
      }, 150);
   };
   return <div onClick={startComm}>Start</div>;
};

export default TEST;
