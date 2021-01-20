import CalculateService from "../../app/services/CalculateService";
import { goldProbes } from "../../_config";
import {editSetting, getSettings} from "@/app/api-admin";


const state = {
  goldProbeArray: goldProbes,
  goldProbe: "585",
  weight: "10",
  term: "5",
  amount: "",
  returnedAmount: "",
  percentLoanCalc : '',
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
       data: ''
     };
     const gold750 = {
       type: '750',
       data: ''
     };
     const response =  await new Promise((resolve, reject) => {
       getSettings()
           .then(res => {
             if (res.data.err) reject(res);
             resolve(res);
           })
           .catch(err => {
             reject(err);
           });
     });
     gold585.data = response.data.find(elem => elem.fieldName == 'probePrice_585').value;
     gold750.data = response.data.find(elem => elem.fieldName == 'probePrice_750').value;

     ctx.commit('setCalcProbePrice', {type: gold585.type, data: gold585.data});
     ctx.commit('setCalcProbePrice', {type: gold750.type, data: gold750.data});
     ctx.commit('setPercentLoanCalc', response.data.find(elem => elem.fieldName == 'processingPercent').value);
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
  async setSetting(ctx, data) {
    let newSetting = await new Promise((resolve, reject) => {
      editSetting(data)
          .then(res => {
            if (res.data.err) reject(res);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
    });
    if (newSetting.data.setting.fieldName == 'probePrice_585') {
      ctx.commit('setCalcProbePrice', {type: '585', data: newSetting.data.setting.value});
    } else if (newSetting.data.setting.fieldName == 'probePrice_750') {
      ctx.commit('setCalcProbePrice', {type: '750', data: newSetting.data.setting.value});
    } else if (newSetting.data.setting.fieldName == 'processingPercent') {
      ctx.commit('setPercentLoanCalc', newSetting.data.setting.value);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
