/************************************************/
/*** This componenet will onyl appear on ********/
/*** Wednesday. For now the topic is Sermon *****/
/*** SunWednesdayday. ***************************/

// comps
import DummyPlaceholder from "./dummy-placeholder";

//styles
import wednesdayStyles from "../../styles/fragments/wigo-content/4.Wednesday.module.css";

type wednesdaysProps = {
   wednesdayContent: {
      songLink: string;
   };
};
const Wednesday = ({ wednesdayContent }: wednesdaysProps) => {
   return (
      <>
         {wednesdayContent && (
            <div className={wednesdayStyles.mainWrapper}>
               {wednesdayContent && wednesdayContent.songLink && (
                  <>
                     <h1 className={wednesdayStyles.title}>Recommended On-Repeat 🎹 🎸</h1>
                     <iframe
                        className={wednesdayStyles.contentHtml}
                        src={`${wednesdayContent.songLink}`}
                        frameBorder='0'
                        allowFullScreen={true}
                        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'></iframe>
                  </>
               )}
            </div>
         )}
         {!wednesdayContent && (
            <DummyPlaceholder
               button='none'
               context={
                  <p>
                     Become a trusted user and show the community your posts can be trusted. On your
                     settings go to <b>apply for user verification</b> and fill out the form!
                  </p>
               }
               imgLink={`/images/wigo-placeholders/no_content_graphic_four.png`}
            />
         )}
      </>
   );
};

export default Wednesday;
