const express = require("express");
const router = express.Router();
const loanService = require("../services/loanService");
const soapRequest = require("../config/soap");

router.post("/getCurrentLoan", function (req, res) {
  loanService
    .currentLoan({
      ...req.body,
      ...{ token: req.tokenElombard },
    })
    .then((loan) => {
      res.status(200).json(loan.data);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/currentOverdraftSmsCode", function (req, res) {
  loanService
    .currentOverdraftSmsCode({
      ...req.body,
      ...{ token: req.tokenElombard },
    })
    .then((loan) => {
      res.status(200).json(loan.data);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/currentOverdraftWithCodeSMS", function (req, res) {
  loanService
    .currentOverdraftWithCodeSMS({
      ...req.body,
      ...{ token: req.tokenElombard },
    })
    .then((loan) => {
      res.status(200).json(loan.data);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/startTransactions", function (req, res) {
  console.log(req.body);
  soapRequest
    .startTransaction({
      amount: req.body.amount,
      order: req.body.ticketNumber,
      newPeriod: req.body.days,
      type: "startTransaction",
    })
    .then((path) => {
      res.status(200).json(path);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/checkStatus", function (req, res) {
  console.log(req.body);
  console.log(req.header("x-requested-with"));
  soapRequest
    .transactionStatus({
      customerRef: req.body.referenceNr,
    })
    .then((status) => {
      // console.log("status", status.transactionStatus);
      if (status.transactionStatus === "PAID") {
        loanService
          .getCreateProlongations({
            ...req.body,
            ...{ token: req.tokenElombard },
          })
          .then((results) => {
            console.log(results.data);
            res.status(200).json(results.data);
          })
          .catch((err) => {
            res.status(200).json(err);
          });
      }
        if (status.transactionStatus === "DECLINED") {
            res.status(500).json({err :'transactionErr'});
        }
        if (status.transactionStatus === "NO_SUCH_TRANSACTION") {
            res.status(500).json({err :'transactionErr'});
        }
    })
    .catch((err) => {
        res.status(500).json(err);
    })
});

module.exports = router;
