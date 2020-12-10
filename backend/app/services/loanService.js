const requests = require("../../app/requests/loan");
const settings = require("../../app/config/_setings");

exports.currentLoan = (data) => {
  return new Promise((resolve, reject) => {
    const sendData = {
      orgBIN: settings.bin,
      token: data.token,
      clientIIN: data.iin,
      pawnTicketNumber: data.ticketNumber,
    };
    requests
      .getCurrentLoan(sendData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.currentOverdraftSmsCode = async (data) => {
  try {
    const sendData = {
      orgBIN: settings.bin,
      token: data.token,
      clientIIN: data.iin,
      pawnTicketNumber: data.ticketNumber,
    };
    return await requests.getCurrentOverdraftSendSMS(sendData);
  } catch (err) {
    return err;
  }
};

exports.currentOverdraftWithCodeSMS = async (data) => {
  try {
    const sendData = {
      orgBIN: settings.bin,
      token: data.token,
      clientIIN: data.iin,
      pawnTicketNumber: data.ticketNumber,
      confirmCode: data.confirmCode

    };
    return await requests.getCurrentOverdraftWithCodeSMS(sendData);
  } catch (err) {
    return err;
  }
};

exports.getCreateProlongations = (data) => {
  return new Promise((resolve, reject) => {
    const sendData = {
      token: data.token,
      orgBIN: settings.bin,
      pawnTicketNumber: Number(data.order),
      newPeriod: Number(data.newDays),
      referenceId: data.referenceNr,
    };
    console.log("sendData", sendData);
    requests
      .createProlongations(sendData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // console.log(err);
        reject(err);
      });
  });
};
