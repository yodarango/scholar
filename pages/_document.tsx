import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head />
            <body>
               <Main />
               <div id='myportal' style={{ position: "relative", zIndex: 10 }} />
               {/* this is for modals where absolute position is needed */}
               <div id='myportal_secondary' style={{ position: "fixed", zIndex: 13, top: 0 }} />
               <NextScript />
            </body>
         </Html>
      );
   }
}
