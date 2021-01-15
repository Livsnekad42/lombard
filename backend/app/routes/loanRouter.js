const express = require("express");
const router = express.Router();
const loanService = require("../services/loanService");
const soapRequest = require("../config/soap");
const errorsCode = require("../../app/config/_error_type");
const settingAppController = require("../controllers/settingApp.controller");
const contents = require("../controllers/content.controller");

router.post("/isProlongation", function (req, res) {
    settingAppController.getSettingsFromFieldName("prolongationState")
        .then(prolongationState => {
            if ( !prolongationState.enable ) {
                contents.getContentItem("prolongationState_disabled")
                    .then(contentComponent => {
                        res.status(200).json({prolongationState: false, content: contentComponent});
                    })
                    .catch(err => {
                        res.status(200).json({prolongationState: false});
                    });
            } else {
                res.status(200).json({prolongationState: true});
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
});

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
  // TODO: получить значение prolongationState
  settingAppController.getSettingsFromFieldName("prolongationState")
    .then(prolongationState => {
      if ( !prolongationState.enable ) {
        res.status(400).json({
          code: errorsCode.no_permission,
          errors: errors,
          text: "Пролонгация отключена"
        });
        return;
      }
      loanService
        .currentOverdraftSmsCode({
          ...req.body,
          ...{ token: req.tokenElombard },
        })
        .then((loan) => {
          res.status(200).json(loan.data);
        })
        .catch((err) => res.status(500).json(err));
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
