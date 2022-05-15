// Gets the current day in year/month/day format (e.g. "2016/02/18")
export const getToday = () => new Date().toISOString().split('T')[0];
