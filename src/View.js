import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  amountInput,
  tipInput
} from './Update';

const {
  div,
  h1,
  pre,
  input,
  p
} = hh(h);


function billAmount(dispatch, model) {

  const { billAmount } = model

  return div({className: 'w-50 ma1'}, [
    p({
      className: 'db w-100 mv2',
    }, 'Bill Amount'),
    input({
      className: 'db w-100 mv2 pa2 input-reset ba',
      type: 'text',

      oninput: v => dispatch(amountInput(v.target.value))
    })
  ]);
}

function tipPercent(dispatch, model) {

  const { tipPercent } = model

  return div({className: 'w-50 ma1'}, [
    p({
      className: 'db w-100 mv2',
    }, 'Tip %'),
    input({
      className: 'db w-100 mv2 pa2 input-reset ba',
      type: 'text',
      oninput: v => dispatch(tipInput(v.target.value))
    })
  ]);
}

function total(dispatch, model) {

  const { tip, total } = model

  return div({className: 'w-50 ma1'}, [
    p({
      className: 'db w-100 mv2',
    }, 'Tip: ' + tip),
    p({
      className: 'db w-100 mv2',
    }, 'Total: ' + total)
  ]);
}

function calcTipAndTotal(billAmount, tipPercent) {
  const bill = parseFloat(billAmount);
  // If result is a invalid number, defaults to 0
  const tip = bill * parseFloat(tipPercent) / 100 || 0;
  const totalBill = bill + tip;

  return [tip, totalBill]
  
}

const round = places =>
  R.pipe(
    num => num * Math.pow(10, places),
    Math.round,
    num => num * Math.pow(10, -1 * places)
  );

const formatMoney = R.curry(
  (symbol, places, number) => {
    return R.pipe(
      R.defaultTo(0),
      round(places),
      num => num.toFixed(places),
      R.concat(symbol)
    )(number)
  }
)

function inputSet(name, value, oninput) {
  return div({className: 'w-50 ma1'}, [
    p({
      className: 'db w-100 mv2',
    }, name),
    input({
      className: 'db w-100 mv2 pa2 input-reset ba',
      type: 'text',
      value,
      oninput
    })
  ]);
}

function calculatedAmounts(tip, total) {
  return div({ className: 'w-40 b bt mt2 pt2' }, [
    calculatedAmount('Tip: ', tip),
    calculatedAmount('Total: ', total),
  ]);
}

function calculatedAmount(description, total) {
  return div({ className: 'flex w-100'}, [
    div({ className: 'w-50 pv1 pr2' }, description),
    div({ className: 'w-50 tr pv1 pr2' }, total),
  ])
}

function view(dispatch, model) {

  const { billAmount, tipPercent } = model

  const [ tip, total ] = calcTipAndTotal(billAmount, tipPercent)

  const toMoney = formatMoney('$', 2)

  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputSet('Bill Amount', billAmount, v => 
      dispatch(amountInput(v.target.value))
    ),
    inputSet('Tip %', tipPercent, v => 
      dispatch(tipInput(v.target.value))
    ),
    calculatedAmounts(toMoney(tip), toMoney(total)),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
