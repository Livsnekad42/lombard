import CalculateService from "../../app/services/CalculateService";
import { goldProbes } from "../../_config";



const state = {
  goldProbeArray: goldProbes,
  goldProbe: "585",
  weight: "10",
  term: "5",
  amount: "",
  returnedAmount: "",
  percentLoanCalc : 0.2,
  probePrice: {
    "585": 10500,
    "750": 13461
  }
};
const CALCULATE = new CalculateService(state.percentLoanCalc);

const getters = {
  getCalcBase: state => name => state[name],
  getCalcProbePrice: state => name => state.probePrice[name],
  getPercentLoanCalc(state) {
    return state.percentLoanCalc;
  }
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
  startCalculate({ state }) {
    CALCULATE.term = Number(state.term);
    CALCULATE.weight = Number(state.weight);
    CALCULATE.goldPrice = state.probePrice[state.goldProbe];
    CALCULATE.calculate();
    state.amount = CALCULATE.amount;
    state.returnedAmount = CALCULATE.returnedAmount;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
