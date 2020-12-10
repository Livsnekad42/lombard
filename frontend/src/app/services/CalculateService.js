export default class CalculateService {
  constructor(percents) {
    this.percents = percents;
  }
  get amount() {
    return this._amount;
  }
  set amount(value) {
    this._amount = value;
  }

  get term() {
    return this._term;
  }
  set term(value) {
    this._term = value;
  }

  get weight() {
    return this._weight;
  }
  set weight(value) {
    this._weight = value;
  }

  get goldPrice() {
    return this._goldPrice;
  }
  set goldPrice(value) {
    this._goldPrice = value;
  }

  get returnedAmount() {
    return this._returnedAmount;
  }
  set returnedAmount(value) {
    this._returnedAmount = value;
  }
  calculate() {
    this.amount = this.goldPrice * this.weight;
    this.returnedAmount =
      this.amount + ((this.amount * this.percents) / 100) * this.term;
  }
}
