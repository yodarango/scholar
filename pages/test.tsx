import { Pagination } from "../fragments/buttons/pagination";
import { DailyVerseCard } from "../fragments/cards/daily_verse_card";

const Test = () => {
   return (
      <div>
         <Pagination goBack='/' goForth='/' type='2' forContent='read' />
         {/* <DailyVerseCard versionId='' /> */}
      </div>
   );
};
export default Test;
