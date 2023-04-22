import React, { useState, useEffect } from "react";
import PortalTernary from "../hoc/portal_ternary";

type TScrollableHeader = {
   children: any;
   height: number;
   cta: {
      handleChangeDir: (visible: boolean) => void;
   };
};

export const ScrollableHeader = ({ children, height, cta }: TScrollableHeader) => {
   const [position, setPosition] = useState(0);
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      const handleScroll = () => {
         let moving = window.pageYOffset;

         setVisible(position > moving);
         setPosition(moving);
      };
      window.addEventListener("scroll", handleScroll);

      setPosition(window.pageYOffset);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   });

   const currentPosition = visible
      ? { top: 0, transition: `top 500ms ease-out` }
      : { top: `-${height}px`, transition: `top 500ms ease-out` };

   useEffect(() => {
      cta.handleChangeDir(visible);
   }, [visible]);
   return (
      <PortalTernary>
         <div style={{ width: "100vw", position: "fixed", ...currentPosition }}>{children}</div>
      </PortalTernary>
   );
};
