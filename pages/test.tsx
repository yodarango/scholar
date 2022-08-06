import { Pagination } from "../fragments/buttons/pagination";
import { DailyVerseCard } from "../fragments/cards/daily_verse_card";
import { DailyVerseImage } from "../fragments/cards/daily_verse_image";
import { CategoryTag } from "../fragments/chunks/category_tag";
import { NavigationMain } from "../layouts/navigation_main";
import { TextEditorActions } from "../layouts/text_editor_actions";

const Test = () => {
   return (
      <div style={{ padding: "3rem" }}>
         {/* <Pagination goBack='/' goForth='/' type='2' forContent='read' /> */}
         {/* <DailyVerseCard versionId='' /> */}
         {/* <NavigationMain /> */}
         {/* <DailyVerseImage versionId='' /> */}
         {/* <CategoryTag id='CYN' /> */}
         <TextEditorActions />
      </div>
   );
};
export default Test;
