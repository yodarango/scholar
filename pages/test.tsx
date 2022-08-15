import { Pagination } from "../fragments/buttons/pagination";
import { DailyVerseCard } from "../fragments/cards/daily_verse_card";
import { DailyVerseImage } from "../fragments/cards/daily_verse_image";
import { CategoryTag } from "../fragments/chunks/category_tag";
import { SeePostInfo } from "../fragments/chunks/see_post_info";
import { TextEditorTopInfo } from "../fragments/text_editor_top_info";
import { TextEditorVerseSelection } from "../fragments/text_editor_verse_selection";
import { VerseRefTagWrapper } from "../fragments/verse_ref_tag_wrapper";
import { NavigationMain } from "../layouts/navigation_main";
import { PreviewThoughtCommentaryStack } from "../layouts/stacks/preview_thought_commentary_stack";
import { TextEditor } from "../layouts/text_editor";
import { TextEditorActions } from "../layouts/text_editor_actions";
import { CommentaryTextEditor } from "../templates/content/commentary_text_editor";
import { ThoughtTextEditor } from "../templates/content/thought_text_editor";

const Test = () => {
   return (
      <div style={{ padding: "3rem" }}>
         {/* <Pagination goBack='/' goForth='/' type='2' forContent='read' /> */}
         {/* <DailyVerseCard versionId='' /> */}
         {/* <NavigationMain /> */}
         {/* <DailyVerseImage versionId='' /> */}
         {/* <CategoryTag id='CYN' /> */}
         {/* <TextEditorActions
            postReferences={[
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3",
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3",
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3"
            ]}
            content={
               <div>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
                  a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
                  passage, and going through the cites of the word in classical literature,
                  discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                  1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                  Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
                  popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                  sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem
                  Ipsum used since the 1500s is reproduced below for those interested. Sections
                  1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                  reproduced in their exact original form, accompanied by English versions from the
                  1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not
                  simply random text. It has roots in a piece of classical Latin literature from 45
                  BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the cites of the word
                  in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
                  sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of
                  Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory
                  of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                  "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard
                  chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                  Cicero are also reproduced in their exact original form, accompanied by English
                  versions from the 1914 translation by H. Rackham.
               </div>
            }
            cta={{
               handleRefVerseSelection: (id) => console.log("close modal", id),
               handleCategorySelection(id) {
                  console.log(id);
               },
               handlePrivacySelection(privacy) {
                  console.log(privacy);
               }
            }}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
         /> */}
         {/* <SeePostInfo
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
         /> */}
         {/* <PreviewThoughtCommentaryStack
            postReferences={[
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3",
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3",
               "JHN.1.1",
               "ROM.3.4",
               "EST.3.3"
            ]}
            body={`
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
                  a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                  Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
                  passage, and going through the cites of the word in classical literature,
                  discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                  1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                  Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
                  popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                  sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem
                  Ipsum used since the 1500s is reproduced below for those interested. Sections
                  1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                  reproduced in their exact original form, accompanied by English versions from the
                  1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not
                  simply random text. It has roots in a piece of classical Latin literature from 45
                  BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the cites of the word
                  in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
                  sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of
                  Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory
                  of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                  "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard
                  chunk of Lorem Ipsum used since the 1500s is reproduced below for those
                  interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
                  Cicero are also reproduced in their exact original form, accompanied by English
                  versions from the 1914 translation by H. Rackham.`}
            cta={{ handleCloseModal: () => console.log("close modal") }}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
         /> */}
         {/* <VerseRefTagWrapper refs={["dsfds", "dfasd", "ssads"]} /> */}
         {/* <TextEditorVerseSelection /> */}
         {/* <TextEditor
            content={`# Title (link)[www.example.com]`}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='123'
            username='Username'
            avatar='/images/user_avatar'
            postPostedOnDate='08/11/22 09:00'
            postCreatedDate='08/11/22 09:00'
            postCategory='YLW'
            postReferences={["1CO.1.1", "MAT.3.2"]}
         /> */}
         {/* <ThoughtTextEditor
            body={`# Title &nbsp; (link)[www.example.com]`}
            postImage='/images/bible_books/1.png'
            userAuthority={1}
            userId='123'
            username='Username'
            avatar='/images/user_avatar'
            postPostedOnDate='08/11/22 09:00'
            postCreatedDate='08/11/22 09:00'
            postCategory='YLW'
            postReferences={["1CO.1.1", "MAT.3.2"]}
            postPrivacy={true}
         /> */}
         <TextEditorTopInfo
            userAuthority={1}
            userId='1'
            username='username'
            bkgImg='/images/bible_books/1.png'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
            cta={{ handleCloseModal: () => console.log("hey") }}
         />
      </div>
   );
};
export default Test;
