const Axios = require('axios');
const logger = require('./logger.service')

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "http://127.0.0.1:12000/api/";

var axios = Axios.create({
    withCredentials: true
});

module.exports = {
  get(endpoint, data){
      return ajax(endpoint, 'GET', data)
  },
  post(endpoint, data){
      return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data){
      return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data){
      return ajax(endpoint, 'DELETE', data)
  }
}

async function ajax(endpoint, method='get', data=null) {
  logger.info('the endpoint that is being requested is: ' + endpoint)
  try {
      const res = await axios({
          url: `${BASE_URL}${endpoint}`,
          method,
          data
      })
      return res.data;
  } catch (err) {
    logger.error(err)
    console.error('Error from Axios ' + err)
  }
} 