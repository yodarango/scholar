// core
import { useState } from "react";

// comps
import DummyPlaceholder from "./dummy-placeholder";

// style
import tuesdayStyles from "../../styles/fragments/wigo-content/3.Tuesday.module.css";

type tuesdayProps = {
   tuesdayContent: {
      imageUrl: String;
      text: String;
      title: String;
   };
};

const Tuesday = ({ tuesdayContent }: tuesdayProps) => {
   const [seeMoreState, setseeMoreState] = useState<string>(`${tuesdayStyles.text}`);
   const handleSeeMore = () => {
      setseeMoreState(`${tuesdayStyles.textExtended}`);
   };

   return (
      <>
         {tuesdayContent && (
            <div className={tuesdayStyles.mainWrapper}>
               <div
                  className={tuesdayStyles.image}
                  style={{
                     backgroundImage: `url(${tuesdayContent.imageUrl})`
                  }}></div>
               <h1 className={tuesdayStyles.title}>{tuesdayContent.title}</h1>
               <p className={seeMoreState}>{tuesdayContent.text}</p>
               {seeMoreState === tuesdayStyles.text && (
                  <div className={`${tuesdayStyles.seeMore}`} onClick={handleSeeMore}></div>
               )}
               {seeMoreState === tuesdayStyles.textExtended && (
                  <div
                     className={`${tuesdayStyles.seeMore}`}
                     onClick={() => setseeMoreState(tuesdayStyles.text)}></div>
               )}
            </div>
         )}

         {!tuesdayContent && (
            <DummyPlaceholder
               button='none'
               context={
                  <p>
                     What do you think of the library content? Do you host or like a particular
                     podcast, website, preacher or other resource that you would like to be added?
                     Recomment a resource from the library page.
                  </p>
               }
               imgLink={`/images/wigo-placeholders/no_content_graphic_three.png`}
            />
         )}
      </>
   );
};

export default Tuesday;
