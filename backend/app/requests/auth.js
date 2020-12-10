const http = require("../config/axios");

/**
 * Получение токена
 * @param {object}data
 * @returns {*}
 */
exports.authorized = data => http.post("Authorize", data);
