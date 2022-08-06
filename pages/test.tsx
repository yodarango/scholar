import { Pagination } from "../fragments/buttons/pagination";
import { DailyVerseCard } from "../fragments/cards/daily_verse_card";
import { DailyVerseImage } from "../fragments/cards/daily_verse_image";
import { NavigationMain } from "../layouts/navigation_main";

const Test = () => {
   return (
      <div>
         {/* <Pagination goBack='/' goForth='/' type='2' forContent='read' /> */}
         {/* <DailyVerseCard versionId='' /> */}
         {/* <NavigationMain /> */}
         <DailyVerseImage versionId='' />
      </div>
   );
};
export default Test;
