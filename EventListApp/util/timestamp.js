export const timestampToStr = (timestamp) => {
  const date = new Date(+timestamp);

  const yearStr = `${date.getFullYear()}`;

  let monthStr = `${+date.getMonth() + 1}`;
  if (monthStr.length === 1) {
    monthStr = "0" + monthStr;
  }

  let dayStr = `${date.getDate()}`;
  if (dayStr.length === 1) {
    dayStr = "0" + dayStr;
  }

  return `${yearStr}-${monthStr}-${dayStr}`;
};

export const dateStrToTimestamp = (dateStr) => {
  const date = new Date(dateStr);

  return date.getTime();
};
