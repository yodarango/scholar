/**************************************************************************************** 
-  Returns a graphical interface that displays the votes for the multiple choice poll
- Since unlimited (nt really, just as many as the letters available in the alphabet) 
   amount of options can be entered, the component looks an array to get the letter for
   each option
****************************************************************************************/
// compoents
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./multiple_choice_poll.module.css";

// types
import { TMultipleChicePollVote } from "../../../types/interactive";

type TMultipleChoicePollProps = {
   optionsAmount: number;
   votes: TMultipleChicePollVote | undefined;
};

export const MultipleChoicePoll = ({ votes, optionsAmount }: TMultipleChoicePollProps) => {
   // alphabet to assign unique letter to each option -----------
   const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
   ];

   console.log(votes);

   let votesArray: number[] = votes?.vote ? votes?.vote : [];

   //  extrapolate percentages
   const totalVotes = votesArray.reduce((a, b) => a + b, 0);
   const max = votes ? Math.max(...votesArray) : 0;
   const min = votes ? Math.min(...votesArray) : 0;
   return (
      <div className={styles.mainWrapper}>
         <section className={styles.optionsWrapper}>
            {votesArray.length > 0 &&
               votesArray.map((vote: number, index: number) => (
                  <div className={styles.option} key={index}>
                     <div
                        className={`${styles.bar} ${max === vote && styles.max} ${
                           min === vote && styles.min
                        }`}
                        style={{ height: `${(vote / totalVotes) * 15}rem` }}></div>

                     <div className={styles.letter}>
                        <Parragraph
                           size='xsmall'
                           text={alphabet[index]}
                           align='center'
                           bold={true}
                           lineHieght='.9em'
                        />
                     </div>
                  </div>
               ))}
            {votesArray.length === 0 &&
               [...Array(optionsAmount)].map((_, index) => (
                  <div className={styles.option} key={index}>
                     <div
                        className={`${styles.bar}
                        `}
                        style={{ height: `15rem` }}></div>

                     <div className={styles.letter}>
                        <Parragraph
                           size='xsmall'
                           text={alphabet[index]}
                           align='center'
                           bold={true}
                           lineHieght='.9em'
                        />
                     </div>
                  </div>
               ))}
         </section>
         <div className={styles.totalVotes}>
            <Parragraph size='small' quiet={true} text={`Total votes: ${totalVotes}`} />
         </div>
      </div>
   );
};
