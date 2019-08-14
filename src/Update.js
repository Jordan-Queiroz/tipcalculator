import * as R from 'ramda';

const MSGS = {
  AMOUNT_INPUT: "AMOUNT_INPUT",
  TIP_INPUT: "TIP_INPUT"
}

export function amountInput(amount) {
  return {
    type: MSGS.AMOUNT_INPUT,
    amount
  }
}

export function tipInput(tipPercent) {
  return {
    type: MSGS.TIP_INPUT,
    tipPercent
  }
}

function calcTip(tipPercent, model) {
  const { billAmount } = model

  const tip = (tipPercent / 100) * billAmount

  return tip
}

function update (msg, model) {
  switch (msg.type) {
    case MSGS.AMOUNT_INPUT:
      const { amount } = msg

      return { ...model, billAmount: amount}
    case MSGS.TIP_INPUT:
      const { tipPercent } = msg

      return { ...model, tipPercent}
  }
  return model;
}

export default update;
