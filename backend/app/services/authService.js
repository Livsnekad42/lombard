const settings = require("../config/_setings");
const requests = require("../requests/auth");
exports.getAuthorization = () => {
  return new Promise((resolve, reject) => {
    const sendData = {
      login: settings.mainLogin,
      password: settings.mainPassword,
    };
    requests
      .authorized(sendData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
