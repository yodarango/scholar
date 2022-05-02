// core
import { useState, useRef } from "react";

// styles
import simpleEditorStyles from "../../styles/fragments/chunks/SimpletextEditor.module.css";
import SmallLoader from "./small-loader";

type simpleLoaderProps = {
   smallLoader: boolean;
   buttonTitle: string;
   defValue?: string;
   handleEvent: any;
};

const simpleTextEditor = ({
   smallLoader,
   buttonTitle,
   defValue,
   handleEvent
}: simpleLoaderProps) => {
   const textArea = useRef<HTMLTextAreaElement>(null);

   return (
      <div className={simpleEditorStyles.mainWrapper}>
         <textarea defaultValue={defValue} ref={textArea}></textarea>
         {!smallLoader && (
            <button
               className='std-button'
               onClick={() => handleEvent(textArea.current ? textArea.current.value : "")}>
               <p className='std-button_gradient-text'>{buttonTitle}</p>
            </button>
         )}
         {smallLoader && <SmallLoader />}
      </div>
   );
};

export default simpleTextEditor;
