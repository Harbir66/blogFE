/* eslint-disable import/prefer-default-export */
import { monthNames } from '../../constants/postCard';

export const getFormattedDateFromUtcDate = (utcDate) => {
  const date = new Date(utcDate);
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

// export default getFormattedDateFromUtcDate;
