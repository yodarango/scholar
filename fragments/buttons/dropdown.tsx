// core
import React, { useState, useRef } from "react";

// components

// styles
import ctaStyles from "../../styles/components/CTA.module.css";

type dropdownProps = {
   //initialValueType: string;
   initialValueCat: string;
   //valuesType?: IdropdownTypesValues[];
   valuesCat?: IdropdownCatValues[];
   openCategoryInfo: any;
   addTag: any;
};

type IdropdownCatValues = {
   title: string;
   key: string;
   tag: string;
   subjects: string[];
};
// type IdropdownTypesValues = {
//    title: string;
//    key: string;
// };
const Dropdown = ({
   //initialValueType,
   initialValueCat,
   //valuesType,
   valuesCat,
   openCategoryInfo,
   addTag
}: dropdownProps) => {
   type IdropdownDisplay = {
      type?: string;
      cat?: string;
      catFunc?: React.MouseEventHandler;
      // typeFunc?: React.MouseEventHandler;
   };

   const hiddenDropdownCat = useRef<HTMLDivElement>(null);
   // const hiddenDropdownType = useRef<HTMLDivElement>(null);

   // const openDropdownType = () => {
   //    setdisplayDropdown({ type: "block", typeFunc: closeDropdownType, catFunc: openDropdownCat });
   // };

   // const closeDropdownType = () => {
   //    setdisplayDropdown({ type: "none", typeFunc: openDropdownType, catFunc: openDropdownCat });
   // };
   const openDropdownCat = () => {
      setdisplayDropdown({
         cat: "block",
         catFunc: closeDropdownCat /*typeFunc: openDropdownType*/
      });
   };

   const closeDropdownCat = () => {
      setdisplayDropdown({ cat: "none", catFunc: openDropdownCat /*typeFunc: openDropdownType*/ });
   };

   const [displayDropdown, setdisplayDropdown] = useState<IdropdownDisplay>({
      type: "none",
      cat: "none",
      catFunc: openDropdownCat
      // typeFunc: openDropdownType
   });
   // if (hiddenDropdownType.current)
   //    hiddenDropdownType.current.style.display = `${displayDropdown.type}`;
   if (hiddenDropdownCat.current)
      hiddenDropdownCat.current.style.display = `${displayDropdown.cat}`;

   return (
      <div className={ctaStyles.dropdownWrapper}>
         {/* <div
            id={ctaStyles.initialValueTypeCommentary}
            className={`${ctaStyles.initialValue} ${ctaStyles.initialValueType}`}
            onClick={displayDropdown.typeFunc}>
            <div className='std-button_gradient-text'>{initialValueType}</div>
         </div>
         <div className={`${ctaStyles.hiddenDropdown}`} ref={hiddenDropdownType}>
            {valuesType?.map((el) => (
               <div data-value={el.key} key={el.key}>
                  {el.title} <span className={`std-vector-icon ${ctaStyles.iconInfo}`}></span>
               </div>
            ))}
         </div> */}
         <div
            className={`${ctaStyles.initialValue} ${ctaStyles.initialValueCat}`}
            onClick={displayDropdown.catFunc}>
            <div className='std-button_gradient-text'>{initialValueCat}</div>
         </div>
         <div
            className={`${ctaStyles.hiddenDropdown} ${ctaStyles.hiddenDropdownCat}`}
            ref={hiddenDropdownCat}>
            {valuesCat?.map((el) => (
               <div>
                  <div /*data-value={el.key}*/ onClick={() => addTag(el)}>{el.title}</div>
                  <span
                     className={`std-vector-icon ${ctaStyles.iconInfo}`}
                     onClick={() => openCategoryInfo(el.subjects, el.key)}></span>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Dropdown;
