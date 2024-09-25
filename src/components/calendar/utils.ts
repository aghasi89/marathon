import moment from 'moment';
import {
  primaryWhite,
  primaryBlue,
  primaryBlack,
} from '../../assets/styles/colors.styles';

export const getCalendarDates = (
  startDate: string,
  endDate: string,
  color: string,
) => {
  const disabledDates: {[key: string]: any} = {};
  const start = moment(startDate);
  const end = moment(endDate);
  for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
    disabledDates[m.format('YYYY-MM-DD')] = {
      color,
      startingDay: true,
      endingDay: true,
      selected: true,
      textColor: primaryBlack,
    };
  }
  for (const [key, value] of Object.entries(disabledDates)) {
    if (
      moment(start).format('YYYY-MM-DD') == key ||
      moment(end).format('YYYY-MM-DD') == key
    ) {
      value.color = primaryBlue;
      value.textColor = primaryWhite;
    }
  }
  return disabledDates;
};
