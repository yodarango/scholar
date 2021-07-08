/*****************************/
/******* MAY DELETE *********/
/***************************/
// core
import React from "react";

// styles
import popupWrapperStyles from "../styles/layouts/PopupWrapper.module.css";

const EditorInstructions = () => {
   return (
      <div className={popupWrapperStyles.editorInstructionsWrapper}>
         <h1 className='std-text-block--small-title'>Editor Instructions</h1>
         <p className='std-text-block'>
            The text editor allows for basic text formating rules that can be achieved by typing the
            specific syntax outlined below.
         </p>
         <table className={popupWrapperStyles.table}>
            <tr>
               <th>Style</th>
               <th>Syntax</th>
               <th>Result</th>
            </tr>
            <tr>
               <td>Title</td>
               <td># Title</td>
               <td>
                  <h1>Title</h1>
               </td>
            </tr>
            <tr>
               <td>Subtitle</td>
               <td>## Subtitle</td>
               <td>
                  <h2>Subtitle</h2>
               </td>
            </tr>
            <tr>
               <td>Heading</td>
               <td>### Heading</td>
               <td>
                  <h3>Heading</h3>
               </td>
            </tr>
            <tr>
               <td>Bold</td>
               <td>**Bold Text**</td>
               <td>
                  <b>Bold Text</b>
               </td>
            </tr>
            <tr>
               <td>Italic</td>
               <td>*Italic Text*</td>
               <td>
                  <i>Italic Text</i>
               </td>
            </tr>
            <tr>
               <td>Numbered List</td>
               <td>
                  1. Apples <br />
                  2. Bananas <br />
                  3. Grapes <br />
               </td>
               <td>
                  <ol>
                     <li>Apples</li>
                     <li>Bananas</li>
                     <li>Grapes</li>
                  </ol>
               </td>
            </tr>
            <tr>
               <td>Bullet List</td>
               <td>
                  - Apples <br />
                  - Bananas <br />
                  - Grapes <br />
               </td>
               <td>
                  <ul>
                     <li>Apples</li>
                     <li>Bananas</li>
                     <li>Grapes</li>
                  </ul>
               </td>
            </tr>
            <tr>
               <td>Link</td>
               <td>[Link Title](https://www.google.com)</td>
               <td>
                  <a href='https://www.google.com'>Link Title</a>
               </td>
            </tr>
            <tr>
               <td>White Space</td>
               <td>
                  top text <br /> {`&nbsp;`} <br /> {`&nbsp;`}
                  <br /> bottom text
               </td>
               <td>
                  top text <br /> <br />
                  bottom text
               </td>
            </tr>
         </table>
      </div>
   );
};

export default EditorInstructions;
