import { useEffect, useRef } from "react";
import styles from "./profile_stats_graph.module.css";

type TProfileStatsGraphProps = {
   content: {
      commentary_count: number;
      article_count: number;
      quote_count: number;
      // sermon_count: number;
   };
};
export const ProfileStatsGraph = ({ content }: TProfileStatsGraphProps) => {
   // ref
   const canvas = useRef<HTMLCanvasElement>(null);

   let { commentary_count, article_count, quote_count } = content;

   let data = [commentary_count, article_count, quote_count];

   let colors = ["#B293FE", "#533CA3", "#F1EAFF"];

   let total = 0;

   if (commentary_count === 0 && article_count === 0 && quote_count === 0) {
      data = [1];
      colors = ["#7350EC"];
   }

   // plot the graph
   useEffect(() => {
      if (canvas.current) {
         let c: any = canvas.current.getContext("2d");
         for (let i = 0; i < data.length; i++) {
            total += data[i];
         }

         let prevAngle = 0;
         for (let i = 0; i < data.length; i++) {
            let fraction = data[i] / total;
            let angle = prevAngle + fraction * Math.PI * 2;
            c.fillStyle = colors[i];
            c.beginPath();
            c.moveTo(250, 250);
            c.arc(250, 250, 100, prevAngle, angle, false);
            c.fill();
            c.stroke();
            prevAngle = angle;
         }
      }
   });

   return (
      <div className={styles.mainWrapper}>
         <canvas width='500' height='500' ref={canvas}></canvas>
         <div className={styles.hole}></div>
      </div>
   );
};
