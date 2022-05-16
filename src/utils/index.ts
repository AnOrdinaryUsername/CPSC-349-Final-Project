import dayjs from 'dayjs';
// Gets the current day in year/month/day format (e.g. "2016/02/18")
export const getToday = () => dayjs(new Date()).format('MM/DD/YYYY');
