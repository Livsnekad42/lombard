const soap = require("soap");
const config = require("../config/_setings");

exports.startTransaction = async ({ amount, order, newPeriod }) => {
  return new Promise(function (resolve, reject) {
    const customerReferenceNum = parseInt(
      (Math.random() * 9 + 1) * Math.pow(10, 12 - 1),
      10
    );
    const transArgs = {
      transaction: {
        merchantId: config.mid,
        terminalId: "",
        orderId: order,
        totalAmount: amount * 100,
        currencyCode: config.currencyCode,
        languageCode: config.languageCode,
        merchantLocalDateTime: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, // config.currentDate
        customerReference: customerReferenceNum,
        // goodsList: `Продление займа. Оплата: ${amount}`,
        returnURL: `${config.returnUrl}?tn=${order}&period=${newPeriod}&ref=${customerReferenceNum}`,
      },
    };

    soap.createClient(config.testEcomUrl, function (err, client) {
      // console.log("--err", err);
      // console.log("--client", client);
      // res.send(err);
      client.startTransaction(
        transArgs,
        function (err, result) {
          if (result) {
            // console.log("result-", result.return.redirectURL);
            // console.log("=========");
            console.log(result.return)
            resolve(result.return.redirectURL);
          }
          if (err) {
            // console.log('////////',client.describe().CNPMerchantWebService.CNPMerchantWebServiceHttpSoap11Endpoint.startTransaction)
            // console.log("~~~", client.lastRequest);
            console.log("err-", err);
            reject(err.body);
          }
        },
        { proxy: config.proxyPath }
      );
    });
  });
};
exports.transactionStatus = ({ customerRef }) => {
  return new Promise((resolve, reject) => {

    const statusArgs = {
      merchantId: config.mid,
      referenceNr: customerRef,
    };
    console.log('statusArgs',statusArgs)
    soap.createClient(config.testEcomUrl, function (err, client) {
      // console.log(client)
      client.getTransactionStatusCode(
        statusArgs,
        function (err, result) {
          if (result) {
            // console.log("result-", result);
            // console.log("~~~", client.lastRequest);
            // console.log("=========");
            resolve(result.return);
          }
          if (err) {
            // console.log('////////',client.describe().CNPMerchantWebService.CNPMerchantWebServiceHttpSoap11Endpoint.startTransaction)
            // console.log("~~~", client.lastRequest);
            // console.log("err-", err);
            reject(err.body);
          }
        },
        { proxy: config.proxyPath }
      );
    });
  });
};
