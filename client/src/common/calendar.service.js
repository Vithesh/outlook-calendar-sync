import ApiService from '@/common/api.service'

const CalendarService = {
  query () {
    return ApiService.query('calender/events')
  },
  get (id) {
    return ApiService.get('calender/events', id)
  },
  update (id, params) {
    return ApiService.update('calender/events', id, { event: params })
  }
}

export default CalendarService
