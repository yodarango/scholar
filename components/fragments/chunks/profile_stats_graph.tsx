import { useEffect, useRef } from "react";
import styles from "./profile_stats_graph.module.css";

type TProfileStatsGraphProps = {
   content: {
      commentaries: number;
      thoughts: number;
      quotes: number;
      sermonNotes: number;
   };
};
export const ProfileStatsGraph = ({ content }: TProfileStatsGraphProps) => {
   // ref
   const canvas = useRef<HTMLCanvasElement>(null);
   const { commentaries, thoughts, quotes, sermonNotes } = content;

   // plot the graph
   useEffect(() => {
      if (canvas.current) {
         var c: any = canvas.current.getContext("2d");

         var data = [commentaries, thoughts, quotes, sermonNotes];

         var colors = ["#B293FE", "#533CA3", "#F1EAFF", "#7350EC"];

         var total = 0;

         for (var i = 0; i < data.length; i++) {
            total += data[i];
         }

         var prevAngle = 0;
         for (var i = 0; i < data.length; i++) {
            var fraction = data[i] / total;
            var angle = prevAngle + fraction * Math.PI * 2;
            c.fillStyle = colors[i];
            c.beginPath();
            c.moveTo(250, 250);
            c.arc(250, 250, 100, prevAngle, angle, false);
            c.fill();
            c.stroke();
            c.shadowOffsetX = "-5";
            c.shadowOffsetY = "-5";
            c.shadowColor = "#B293FE";
            c.shadowBlur = "15";
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
