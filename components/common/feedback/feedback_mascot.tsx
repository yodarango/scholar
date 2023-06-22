import React from "react";
import { Empty } from "./empty";

type TFeedBackMascotProps = {
   type: "empty" | "error" | "loading";
   size?: "small" | "medium" | "large";
   className?: string;
};

export const FeedBackMascot = ({ type, size = "medium", className }: TFeedBackMascotProps) => {
   if (type === "empty")
      return (
         <div className={className}>
            <Empty size={size} />
         </div>
      );
   return <></>;
};
