export const convertTimestampToDateValue = (timestamp) => {
  try {
    return new Date(+timestamp).toISOString().substring(0, 10);
  } catch {
    return '';
  }
};

export const convertDateValueToTimeStamp = (dateValue) => {
  try {
    return '' + new Date(dateValue).getTime();
  } catch {
    return '';
  }
};
