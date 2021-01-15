const axios = require("axios");

module.exports = axios.create({
    baseURL: "http://localhost:4040/api/",
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
});