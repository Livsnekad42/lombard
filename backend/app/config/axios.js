const axios = require("axios");
const https = require("https");

module.exports = axios.create({
  baseURL: "https://www.elombard.kz:53126/Api/",
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  })
});