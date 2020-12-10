const http = require("../config/axios");

exports.getCurrentLoan = (data) => http.post("CurrentOverdraft", data);

exports.getCurrentOverdraftSendSMS = (data) => http.post("CurrentOverdraftSendSMS", data);

exports.getCurrentOverdraftWithCodeSMS = (data) => http.post("CurrentOverdraftWithCodeSMS", data);

exports.createProlongations = (data) =>
  http.post("CreatePawnTicketProlongation", data);

