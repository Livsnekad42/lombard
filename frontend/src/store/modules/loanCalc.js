import CalculateService from "../../app/services/CalculateService";
import { percentLoanCalc, goldProbes } from "../../_config";

const CALCULATE = new CalculateService(percentLoanCalc);

const state = {
  goldProbeArray: goldProbes,
  goldProbe: "585",
  weight: "10",
  term: "5",
  amount: "",
  returnedAmount: "",
  probePrice: {
    "585": 10500,
    "750": 13461
  }
};

const getters = {
  getCalcBase: state => name => state[name],
  getCalcProbePrice: state => name => state.probePrice[name]
};

const mutations = {
  setCalcBase(state, { type, data }) {
    state[type] = data;
  },
  setCalcProbePrice(state, { type, data }) {
    state.probePrice[type] = data;
  }
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
