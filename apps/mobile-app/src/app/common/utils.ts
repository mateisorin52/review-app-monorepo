export const mapRatingToText = (rating: number) => {
  switch (rating) {
    case 1:
      return 'Very bad';
    case 2:
      return 'Bad';
    case 3:
      return 'Ok';
    case 4:
      return 'Good';
    case 5:
      return 'Excellent';
    default:
      return '';
  }
};
