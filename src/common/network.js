import axios from 'axios'
// eslint-disable-next-line
let msg = {
  url: process.env.API_HOST,
  success: res => {
  }
}
function request (msg) {
  axios.get(process.env.API_HOST + msg.url).then(
    msg.success
  )
}
export default { request }
