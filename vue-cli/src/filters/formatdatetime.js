import moment from 'moment';

export function formatdatetime (value) {
  return moment(String(value)).format('DD MMM YYYY, h:mm a')
}