import React, { useState, useEffect } from "react";
import CurrencySelect from "./CurrencySelect";
import PurchaseAmount from "./PurchaseAmount";
import Slider from "@material-ui/core/Slider";
import currencies from "./currencies.json";
import "./slider.scss";
import "./calculator.scss";

export default (props) => {
  const [moneyAmount, setMoneyAmount] = useState("1 000");
  const [moneyAmountNumber, setMoneyAmountNumber] = useState(1000);
  const [currencyChanging, setCurrencyChanging] = useState(false);
  const [chosenCurrency, setChosenCurrency] = useState(currencies[0]);
  const [realAmount, setRealAmount] = useState(10000);
  const marks = [
    { value: 10000, label: "1т.", sliderVal: 1000 },
    { value: 20000, label: "10т.", sliderVal: 10000 },
    { value: 30000, label: "50т.", sliderVal: 50000 },
    { value: 40000, label: "100т.", sliderVal: 100000 },
    { value: 50000, label: "300т.", sliderVal: 300000 },
    { value: 60000, label: "500т.", sliderVal: 500000 },
    { value: 70000, label: "1м", sliderVal: 1000000 },
  ];
  const comission = 0.0007902;
  function valuetext(value) {
    return value;
  }
  function getMoneyAmount(e, val) {
    let percent = +("0." + (val + "")[1] + (val + "")[2]);
    if (marks[+(val + "")[0]] !== marks[marks.length]) {
      setMoneyAmount(
        Math.round(
          (marks[+(val + "")[0]].sliderVal -
            marks[+(val + "")[0] - 1].sliderVal) *
            percent +
            marks[+(val + "")[0] - 1].sliderVal
        )
          .toString()
          .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")
      );
    } else
      setMoneyAmount(
        marks[marks.length - 1].sliderVal
          .toString()
          .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")
      );
  }
  function getRealSliderValue() {
    let tmp;
    for (let i = 1; i < marks.length; i++) {
      if (moneyAmountNumber < marks[i].sliderVal) {
        let percent =
          ((marks[i].sliderVal - marks[i - 1].sliderVal) / moneyAmountNumber) *
          0.01;
        tmp =
          (marks[i].value - marks[i - 1].value) * percent + marks[i - 1].value;
        break;
      } else if (moneyAmountNumber < marks[0].sliderVal) {
        tmp = 10000;
        break;
      } else if (moneyAmountNumber > marks[marks.length - 1].sliderVal) {
        tmp = 70000;
      }
    }
    console.log(tmp);

    /* setRealAmount(tmp); */
  }
  function typeFunction(event) {
    setMoneyAmount(event.target.value);
  }
  function moneySeparate() {
    setMoneyAmount(
      moneyAmount
        .replace(/\s/g, "")
        .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")
    );
  }
  function currencyChange() {
    setCurrencyChanging(!currencyChanging);
  }
  function chooseCurrency(currency) {
    setChosenCurrency(currency);
    setCurrencyChanging(false);
  }
  function getMoneyAmountNumber() {
    setMoneyAmountNumber(moneyAmount.replace(/\s/g, ""));
  }
  useEffect(() => {
    getMoneyAmountNumber();
    getRealSliderValue();
  }, [moneyAmount]);
  return (
    <div className="calculator">
      <h2 className="calculator__title">Калькулятор</h2>
      <div className="calculator__flex-wrapper">
        <div className="calculator__col">
          <CurrencySelect
            chosenCurrency={chosenCurrency}
            chooseCurrency={chooseCurrency}
            isCurrencyChanging={currencyChanging}
            currencyChange={currencyChange}
          />
          <PurchaseAmount
            amount={moneyAmount}
            typeFunction={typeFunction}
            chosenCurrency={chosenCurrency}
            moneySeparate={moneySeparate}
          />
          <div className="calculator__slider-wrapper">
            <Slider
              defaultValue={10000}
              getAriaValueText={valuetext}
              min={10000}
              max={70000}
              step={1}
              marks={marks}
              onChange={getMoneyAmount}
            />
          </div>
        </div>
        <div className="calculator__col ">
          <div className="summary calculator__summary">
            <div className="summary__position">
              <div className="summary__title">
                Комиссия за сделку и вывод валюты<sup>5</sup>
              </div>
              <div className="summary__data">
                {Math.ceil(moneyAmountNumber * chosenCurrency.cost * comission)
                  .toString()
                  .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")}{" "}
                ₽
              </div>
            </div>
            <div className="summary__position">
              <div className="summary__title">Курс с учетом комисси</div>
              <div className="summary__data">
                {(chosenCurrency.cost * 1.0007902)
                  .toFixed(4)
                  .toString()
                  .replace(/[.]/, ",")}{" "}
                ₽
              </div>
            </div>
            <div className="summary__position">
              <div className="summary__title">Общая сумма сделки*</div>
              <div className="summary__data summary__data--primary">
                {Math.ceil(
                  moneyAmountNumber * chosenCurrency.cost * comission +
                    moneyAmountNumber * chosenCurrency.cost
                )
                  .toString()
                  .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")}{" "}
                ₽
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
