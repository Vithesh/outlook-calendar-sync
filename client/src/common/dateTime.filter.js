import { default as format } from 'date-fns/format'

export default ({ DateTime, TimeZone }) => {
  return format(new Date(`${DateTime}${TimeZone === 'UTC' ? 'Z' : ''}`), 'hh:mm - MMMM D, YYYY')
}
