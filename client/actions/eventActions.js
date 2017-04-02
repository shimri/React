import axios from 'axios'

export function createEvent(event) {
  return dispatch => {
    return axios.post('/api/events',{
                        validateStatus: function (status) {
                          return status < 400; // Reject only if the status code is greater than or equal to 500
                        }
                      } , event)
  }
}
