// takes is the ratings of the user to return the approapiate grading
export const calculateApprovalLevel: (approval_rating: number) => {
   grade: string;
   styles: string;
   color: string;
} = (approval_rating: number) => {
   console.log(approval_rating);
   if (approval_rating === 101) {
      return { grade: "R", styles: "rating-level-nr", color: "#f1eaff" };
   } else if (approval_rating >= 97)
      return { grade: "A+", styles: "rating-level-a", color: "#75d975" };
   else if (approval_rating >= 94 && approval_rating < 97)
      return { grade: "A", styles: "rating-level-a", color: "#75d975" };
   else if (approval_rating >= 90 && approval_rating < 94)
      return { grade: "A-", styles: "rating-level-a", color: "#75d975" };
   else if (approval_rating >= 87 && approval_rating < 90)
      return { grade: "B+", styles: "rating-level-b", color: "#b3eeb3" };
   else if (approval_rating >= 83 && approval_rating < 87)
      return { grade: "B", styles: "rating-level-b", color: "#b3eeb3" };
   else if (approval_rating >= 80 && approval_rating < 83)
      return { grade: "B-", styles: "rating-level-b", color: "#b3eeb3" };
   else if (approval_rating >= 77 && approval_rating < 80)
      return { grade: "C+", styles: "rating-level-c", color: "#ebcf5e" };
   else if (approval_rating >= 73 && approval_rating < 77)
      return { grade: "C", styles: "rating-level-c", color: "#ebcf5e" };
   else if (approval_rating >= 70 && approval_rating < 73)
      return { grade: "C-", styles: "rating-level-c", color: "#ebcf5e" };
   else if (approval_rating >= 67 && approval_rating < 70)
      return { grade: "D+", styles: "rating-level-d", color: "#f4745e" };
   else if (approval_rating > 60 && approval_rating < 67)
      return { grade: "D", styles: "rating-level-d", color: "#f4745e" };
   else if (approval_rating <= 60)
      return { grade: "F", styles: "rating-level-f", color: "#db4c42" };
   return {
      grade: "",
      styles: "",
      color: ""
   };
};
