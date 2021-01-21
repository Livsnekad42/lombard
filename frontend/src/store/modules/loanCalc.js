import CalculateService from "../../app/services/CalculateService";
import { goldProbes } from "../../_config";
import {editSetting, getPublicSettings } from "@/app/api-admin";


const state = {
  goldProbeArray: goldProbes,
  goldProbe: "585",
  weight: "10",
  term: "5",
  amount: "",
  returnedAmount: "",
  percentLoanCalc : 0.2,
  probePrice: {
    "585": '',
    "750": ''
  }


};


const getters = {
  getCalcBase: state => name => state[name],
  getPercentLoanCalc(state) {
    return state.percentLoanCalc;
  },
  get585Price(state) {
    return state.probePrice['585'];
  },
  get750Price(state) {
    return state.probePrice['750'];
  },
};

const mutations = {
  setCalcBase(state, { type, data }) {
    state[type] = data;
  },
  setCalcProbePrice(state, { type, data }) {
    state.probePrice[type] = data;
  },
  setPercentLoanCalc(state, percent) {
    state.percentLoanCalc = percent;
  },
};

const actions = {
   async actualizeCalcPrices(ctx) {
     const gold585 = {
       type: '585',
       data: 10500
     };
     const gold750 = {
       type: '750',
       data: 13461
     };
     const response =  await new Promise((resolve, reject) => {
       getPublicSettings()
           .then(res => {
             if (res.data.err) reject(res);
             resolve(res);
           })
           .catch(err => {
             reject(err);
           });
     });
     const response585 = response.data.find(elem => elem.fieldName == 'probePrice_585');
     const response750 = response.data.find(elem => elem.fieldName == 'probePrice_750');
     if (response585 && !isNaN(+response585.value)) {
       gold585.data = +response585.value;
     };
     if (response750 && !isNaN(+response750.value)) {
       gold750.data = +response750.value;
     };

     ctx.commit('setCalcProbePrice', {type: gold585.type, data: gold585.data});
     ctx.commit('setCalcProbePrice', {type: gold750.type, data: gold750.data});
  //   ctx.commit('setPercentLoanCalc', response.data.find(elem => elem.fieldName == 'processingPercent').value)
  },
  startCalculate({ state }) {
    const CALCULATE = new CalculateService(state.percentLoanCalc);
    CALCULATE.term = Number(state.term);
    CALCULATE.weight = Number(state.weight);
    CALCULATE.goldPrice = state.probePrice[state.goldProbe];
    CALCULATE.calculate();
    state.amount = CALCULATE.amount;
    state.returnedAmount = CALCULATE.returnedAmount;
  },

};

export default {
  state,
  getters,
  mutations,
  actions
};
