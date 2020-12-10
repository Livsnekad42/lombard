import {
  authorized,
  getLoan,
  getCurrentOverdraftSmsCode,
  createProlongation,
  startTransactions,
  getProcessingStatus,
  getCurrentOverdraftWithCodeSMS
} from "../../app/api";
import { getCookie, setCookie, cookieRemove } from "../../app/settings/token";

const actions = {
  /**
   *
   * @param data
   * @returns {Promise<unknown>}
   */
  async getAuthorize(data) {
    return await new Promise((resolve, reject) => {
      if (getCookie() === "undefined" || typeof getCookie() === "undefined") {
        authorized(data)
          .then(res => {
            setCookie({ value: res.data.data.token });
            resolve();
          })
          .catch(err => reject(err));
      }
    });
  },
  /**
   *
   * @param commit
   * @param dispatch
   * @param data
   * @returns {Promise<unknown>}
   */
  async currentOverdraftSmsCode({ dispatch }, data) {
    return await new Promise((resolve, reject) => {
      const sendData = {
        iin: data.iin,
        ticketNumber: data.ticketNumber
      };
      getCurrentOverdraftSmsCode(sendData)
        .then(res => {
          if (Object.keys(res.data)[0] === "errors") {
            res.data.errors.forEach(err => {
              console.log("err", err);
              if (err.code === 4) {
                cookieRemove();
                dispatch("getAuthorize").then(() => {
                  dispatch("startSMSVerification");
                });
              }
              if (err.code === 6 || err.code === 11 || err.code === 5) {
                reject(err);
              }
            });
          }
          resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },

  /**
   *
   * @param commit
   * @param dispatch
   * @param data
   * @returns {Promise<unknown>}
   */
  async currentOverdraftWithCodeSMS({ dispatch }, data) {
    return await new Promise((resolve, reject) => {
      const sendData = {
        iin: data.iin,
        ticketNumber: data.ticketNumber,
        confirmCode: data.smsCode
      };
      // console.log(sendData);
      getCurrentOverdraftWithCodeSMS(sendData)
        .then(res => {
          if (Object.keys(res.data)[0] === "errors") {
            res.data.errors.forEach(err => {
              console.log("err", err);
              if (err.code === 4) {
                cookieRemove();
                dispatch("getAuthorize").then(() => {
                  dispatch("smsVerification");
                });
              }
              reject(err);
            });
          }
          resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },

  /**
   *
   * @param commit
   * @param dispatch
   * @param data
   * @returns {Promise<unknown>}
   */
  async getCurLoan({ dispatch }, data) {
    return await new Promise((resolve, reject) => {
      const sendData = {
        iin: data.iin,
        ticketNumber: data.ticketNumber
      };
      getLoan(sendData)
        .then(res => {
          if (Object.keys(res.data)[0] === "errors") {
            res.data.errors.forEach(err => {
              console.log("err", err);
              if (err.code === 4) {
                cookieRemove();
                dispatch("getAuthorize").then(() => {
                  dispatch("getCurrentLoan");
                });
              }
              if (err.code === 5) {
                reject(err);
              }
              if (err.code === 6) {
                reject(err);
              }
            });
          }
          resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },
  async getStartTransactions({ getters }, data) {
    return await new Promise((resolve, reject) => {
      const days = getters.getProlongationsLoanDataBase("days");
      console.log(days);
      const sendData = {
        days: data.loanData.days,
        amount: data.loanData.amount,
        ticketNumber: data.incomeData.ticketNumber
      };
      startTransactions(sendData)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },
  async getProcessingTransactionStatus({ dispatch }, data) {
    return await new Promise((resolve, reject) => {
      const sendData = {
        order: data.tn,
        referenceNr: data.ref,
        newDays: data.period
      };
      getProcessingStatus(sendData)
        .then(res => {
          if (Object.keys(res.data)[0] === "errors") {
            res.data.errors.forEach(err => {
              console.log("err", err);
              if (err.code === 4) {
                cookieRemove();
                dispatch("getAuthorize").then(() => {
                  dispatch("getTransactionStatus", data);
                });
              }
            });
          }
          resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },
  /**
   *
   * @param data
   * @returns {Promise<unknown>}
   */
  async currentProlongation(data) {
    return await new Promise((resolve, reject) => {
      createProlongation(data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};

export default {
  actions
};
