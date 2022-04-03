const calulateApprovalLevel = (approval_rating: number) => {
   if (approval_rating >= 97) return { grade: "A+", styles: "A" };
   else if (approval_rating >= 94 && approval_rating < 97) return { grade: "A", styles: "A" };
   else if (approval_rating >= 90 && approval_rating < 94) return { grade: "A-", styles: "A" };
   else if (approval_rating >= 87 && approval_rating < 90) return { grade: "B+", styles: "B" };
   else if (approval_rating >= 83 && approval_rating < 87) return { grade: "B", styles: "B" };
   else if (approval_rating >= 80 && approval_rating < 83) return { grade: "B", styles: "B" };
   else if (approval_rating >= 77 && approval_rating < 80) return { grade: "C+", styles: "C" };
   else if (approval_rating >= 73 && approval_rating < 77) return { grade: "C", styles: "C" };
   else if (approval_rating >= 70 && approval_rating < 73) return { grade: "C-", styles: "C" };
   else if (approval_rating >= 67 && approval_rating < 70) return { grade: "D+", styles: "D" };
   else if (approval_rating > 60 && approval_rating < 67) return { grade: "", styles: "D" };
   else if (approval_rating <= 60) return { grade: "F", styles: "F" };
};

export default calulateApprovalLevel;
