import {
  convertTimestampToDateValue,
  convertDateValueToTimeStamp,
} from '../utils/date.helper';
export class EventData {
  constructor(eventName, startDate, endDate, id) {
    this.eventName = eventName;
    this.startDate = startDate;
    this.endDate = endDate;
    if (id !== undefined) {
      this.id = id;
    }
    if (!startDate.includes('-') && !endDate.includes('-')) {
      this.parseDateValue();
    }
  }

  parseDateValue() {
    this.startDate = convertTimestampToDateValue(this.startDate);
    this.endDate = convertTimestampToDateValue(this.endDate);
  }
  parseTimeStamp() {
    this.startDate = convertDateValueToTimeStamp(this.startDate);
    this.endDate = convertDateValueToTimeStamp(this.endDate);
  }
  isValidForSave() {
    return (
      !!this.eventName &&
      !this.startDate.includes('-') &&
      !this.endDate.includes('-') &&
      +this.startDate < +this.endDate
    );
  }

  isInTheFuture() {
    return Date.now() < +convertDateValueToTimeStamp(this.startDate);
  }
}
