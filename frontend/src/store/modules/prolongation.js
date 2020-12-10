import { mainQuery } from "../../_config";
import router from "../../router";
const state = {
  incomeData: {
    iin: "",
    ticketNumber: ""
  },
  loanData: {
    days: 3,
    amount: "",
    ticketNumber: ""
  },
  captchaVerify: false,
  smsCode: ""
};
const getters = {
  getProlongationsIncomeBase: state => name => state.incomeData[name],
  getProlongationsBase: state => name => state[name],
  getProlongationsLoanDataBase: state => name => state.loanData[name]
};
const mutations = {
  setProlongationIncomeBase(state, { type, data }) {
    state.incomeData[type] = data;
  },
  setProlongationBase(state, { type, data }) {
    state[type] = data;
  },
  setProlongationLoanDataBase(state, { type, data }) {
    state.loanData[type] = data;
  }
};

const actions = {
  startSMSVerification({ state, dispatch, commit }) {
    if (!state.captchaVerify) return;
    dispatch("currentOverdraftSmsCode", state.incomeData)
      .then(() => {
        const titleText = "На ваш номер отправлено смс с кодом подтверждения";
        commit("setModalBase", {
          type: "type",
          data: "smsCodeModal"
        });
        commit("setModalBase", { type: "title", data: titleText });
      })
      .catch(err => {
        if (err.code === 9 || err.code === 11) {
          const errorText = "Ошибка отправки смс попробуйте позже";
          commit("setModalBase", { type: "type", data: "declineLoanData" });
          commit("setModalBase", { type: "title", data: errorText });
        }

        if (err.code === 6) {
          commit("setModalBase", { type: "type", data: "declineLoanData" });
          commit("setModalBase", { type: "title", data: err.text });
        }
      });
  },

  smsVerification({ state, dispatch, commit }) {
    dispatch("currentOverdraftWithCodeSMS", {
      ...state.incomeData,
      smsCode: state.smsCode
    })
      .then(resp => {
        if (resp.data.maxPeriod === 0) {
          const prolongationDayText =
            "Продление невозможно. Обратитесь «Пожалуйста» в отделение для переоткрытия займа";

          commit("setModalBase", { type: "type", data: "declineLoanData" });
          commit("setModalBase", {
            type: "title",
            data: prolongationDayText
          });
          return;
        }

        commit("setProlongationLoanDataBase", {
          type: "amount",
          data: resp.data.percentSum
        });
        commit("setProlongationLoanDataBase", {
          type: "days",
          data: resp.data.maxPeriod
        });
        commit("setModalBase", {
          type: "type",
          data: "prolongation"
        });
      })
      .catch(err => {
        if (err.code === 8) {
          commit("setModalBase", { type: "validateError", data: err.text });
        }
      });
  },
  getCurrentLoan({ state, dispatch, commit }) {
    // if (!state.captchaVerify) return;
    dispatch("getCurLoan", state.incomeData)
      .then(resp => {
        commit("setProlongationLoanDataBase", {
          type: "amount",
          data: resp.data.percentSum
        });
        commit("setModalBase", {
          type: "type",
          data: "prolongation"
        });
      })
      .catch(err => {
        if (err.code === 5 || err.code === 6) {
          commit("setModalBase", { type: "type", data: "declineLoanData" });
          commit("setModalBase", { type: "title", data: err.text });
        }
      });
  },
  startProcessingTransaction({ state, dispatch, commit }) {
    commit("setLoaderBase", { type: "type", data: "fullScreen" });
    dispatch("getStartTransactions", state)
      .then(url => {
        location.assign(url);
      })
      .catch(err => {
        commit("setLoaderBase", { type: "type", data: "" });
        console.log(err);
      });
  },
  getTransactionStatus({ dispatch, commit }, urlQuery) {
    if (urlQuery) {
      const param = {};

      for (let [key, value] of Object.entries(urlQuery)) {
        if (
          mainQuery.indexOf(key) >= 0 &&
          typeof value !== "undefined" &&
          value !== "undefined"
        )
          param[key] = value;
      }
      if (Object.keys(param).length === mainQuery.length) {
        commit("setLoaderBase", { type: "type", data: "fullScreen" });
        dispatch("getProcessingTransactionStatus", param)
          .then(data => {
            console.log("whith out all", data);
            commit("setLoaderBase", { type: "type", data: "" });
            commit("setModalBase", { type: "type", data: "readyProlongation" });
            router.replace("/");
            // location.replace("/");
          })
          .catch(err => {
            console.log(err);
            commit("setModalBase", {
              type: "type",
              data: "declineProlongation"
            });
            commit("setLoaderBase", { type: "type", data: "" });
            router.replace("/");
            // location.replace("/");
          });
      }
    }
  }
};

export default { state, getters, mutations, actions };
