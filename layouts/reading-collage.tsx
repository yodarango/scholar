// core
import { useState, useEffect } from "react";
const Cookie = require("js-cookie");

//Components
import ReadingCollageUnit from "../fragments/squares/reading-collage-unit";
import MultiViewSettings from "../fragments/popup-content/multi-view-settings";

// Styles
import readingCollageStyles from "../styles/layouts/ReadingCollage.module.css";

//helpers

// others

type readingCollageProps = {
   versionId: string;
};
const ReadingCollage = ({ versionId }: readingCollageProps) => {
   // =====================   FUNCTION 1 : open the settings popup for Multiview  =================///
   const [viewSettingsPopUpState, setViewSettingsPopUpState] = useState<JSX.Element | boolean>(
      false
   );
   const openMultiViewPopup = () => {
      setViewSettingsPopUpState(
         <MultiViewSettings
            handleMultiverseView={handleMultiverseView}
            closeMultiView={closeMultiView}
         />
      );
   };
   const closeMultiViewPopup = () => {
      setViewSettingsPopUpState(false);
   };

   // ========================   FUNCTION 2 : set the multiviewer screen based on user selection   ============///
   /// check if the Cookie does not exist to rnder only one screen
   type TmultiViewerOpenClassState = {
      screenOne: string;
      screenTwo: string;
      screenThree: string;
      screenFour: string;
   };
   const [multiViewerOpenClassState, setmultiViewerOpenClassState] =
      useState<TmultiViewerOpenClassState>({
         screenOne: "",
         screenTwo: "",
         screenThree: "",
         screenFour: ""
      });
   const setTheInitialSettings = () => {
      const multiViewCookie = Cookie.get("mvTwo");
      if (!multiViewCookie) {
         Cookie.set("mvOne", "", { path: "/read" });
         Cookie.set("mvTwo", readingCollageStyles.hiddenScreenTwo, { path: "/read" });
         Cookie.set("mvThree", readingCollageStyles.hiddenScreenThree, { path: "/read" });
         Cookie.set("mvFour", readingCollageStyles.hiddenScreenFour, { path: "/read" });
      }
   };

   useEffect(() => {
      setTheInitialSettings();
      setmultiViewerOpenClassState({
         screenOne: Cookie.get("mvOne"),
         screenTwo: Cookie.get("mvTwo"),
         screenThree: Cookie.get("mvThree"),
         screenFour: Cookie.get("mvFour")
      });
      return () => {};
   }, []);

   const handleMultiverseView = (numberOfWindows: string[]) => {
      Cookie.set("mvOne", numberOfWindows[0], { expires: 7, path: "/read" });
      Cookie.set("mvTwo", numberOfWindows[1], { expires: 7, path: "/read" });
      Cookie.set("mvThree", numberOfWindows[2], { expires: 7, path: "/read" });
      Cookie.set("mvFour", numberOfWindows[3], { expires: 7, path: "/read" });

      setmultiViewerOpenClassState({
         screenOne: numberOfWindows[0],
         screenTwo: numberOfWindows[1],
         screenThree: numberOfWindows[2],
         screenFour: numberOfWindows[3]
      });
      setViewSettingsPopUpState(false);
   };

   const closeMultiView = () => {
      Cookie.remove("mvOne", { path: "/read" });
      Cookie.remove("mvTwo", { path: "/read" });
      Cookie.remove("mvThree", { path: "/read" });
      Cookie.remove("mvFour", { path: "/read" });

      setmultiViewerOpenClassState({
         screenOne: "",
         screenTwo: readingCollageStyles.hiddenScreenTwo,
         screenThree: readingCollageStyles.hiddenScreenThree,
         screenFour: readingCollageStyles.hiddenScreenFour
      });
      setViewSettingsPopUpState(false);
   };
   return (
      <>
         {viewSettingsPopUpState}
         <div className={readingCollageStyles.mainWrapper}>
            {viewSettingsPopUpState === false && (
               <div
                  className={`${readingCollageStyles.multiView}`}
                  onClick={openMultiViewPopup}></div>
            )}
            {viewSettingsPopUpState && (
               <div
                  className={`${readingCollageStyles.multiView}`}
                  onClick={closeMultiViewPopup}></div>
            )}
            {/* {multiViewerOpenState} */}
            <ReadingCollageUnit
               versionId={versionId}
               multiViewClass={`${multiViewerOpenClassState.screenOne}`}
            />
            <ReadingCollageUnit
               versionId={versionId}
               multiViewClass={`${multiViewerOpenClassState.screenTwo}`}
            />
            <ReadingCollageUnit
               versionId={versionId}
               multiViewClass={`${multiViewerOpenClassState.screenThree}`}
            />
            <ReadingCollageUnit
               versionId={versionId}
               multiViewClass={`${multiViewerOpenClassState.screenFour}`}
            />
         </div>
      </>
   );
};

export default ReadingCollage;
