// global styles
import "../styles/globals.css";

// use optimized prop for Next.js images in storybook
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
   configurable: true,
   value: (props) => <OriginalNextImage {...props} unoptimized />
});

// default parameters
export const parameters = {
   actions: { argTypesRegex: "^on[A-Z].*" },
   controls: {
      matchers: {
         color: /(background|color)$/i,
         date: /Date$/
      }
   }
};
