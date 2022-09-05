export const calulateApprovalLevel: (
   approval_rating: number,
   count: number
) => { grade: string; styles: string; color: string } = (
   approval_rating: number,
   count: number
) => {
   if (count === 0) {
      return { grade: "NR", styles: "rating-level-nr", color: "#5C5470" };
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
      return { grade: "B", styles: "rating-level-b", color: "#b3eeb3" };
   else if (approval_rating >= 77 && approval_rating < 80)
      return { grade: "C+", styles: "rating-level-c", color: "#ebcf5e" };
   else if (approval_rating >= 73 && approval_rating < 77)
      return { grade: "C", styles: "rating-level-c", color: "#ebcf5e" };
   else if (approval_rating >= 70 && approval_rating < 73)
      return { grade: "C-", styles: "rating-level-c", color: "#ebcf5e" };
   else if (approval_rating >= 67 && approval_rating < 70)
      return { grade: "D+", styles: "rating-level-d", color: "#f4745e" };
   else if (approval_rating > 60 && approval_rating < 67)
      return { grade: "", styles: "rating-level-d", color: "#f4745e" };
   else if (approval_rating <= 60)
      return { grade: "F", styles: "rating-level-f", color: "#db4c42" };
   return {
      grade: "",
      styles: "",
      color: ""
   };
};
