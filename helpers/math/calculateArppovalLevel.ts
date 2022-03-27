const calulateApprovalLevel = (approval_rating: number) => {
   if (approval_rating >= 97) return "A+";
   else if (approval_rating >= 94 && approval_rating < 97) return "A";
   else if (approval_rating >= 90 && approval_rating < 94) return "A-";
   else if (approval_rating >= 87 && approval_rating < 90) return "B+";
   else if (approval_rating >= 83 && approval_rating < 87) return "B";
   else if (approval_rating >= 80 && approval_rating < 83) return "B-";
   else if (approval_rating >= 77 && approval_rating < 80) return "C+";
   else if (approval_rating >= 73 && approval_rating < 77) return "C";
   else if (approval_rating >= 70 && approval_rating < 73) return "C-";
   else if (approval_rating >= 67 && approval_rating < 70) return "D+";
   else if (approval_rating > 60 && approval_rating < 67) return "D-";
   else if (approval_rating <= 60) return "F";
};

export default calulateApprovalLevel;
