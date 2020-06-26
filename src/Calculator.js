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
  const [realAmount, setRealAmount] = useState(0);
  const marks = [
    { value: 0, label: "1т.", sliderVal: 1000 },
    { value: 1, label: "10т.", sliderVal: 10000 },
    { value: 2, label: "50т.", sliderVal: 50000 },
    { value: 3, label: "100т.", sliderVal: 100000 },
    { value: 4, label: "300т.", sliderVal: 300000 },
    { value: 5, label: "500т.", sliderVal: 500000 },
    { value: 6, label: "1м", sliderVal: 1000000 },
  ];
  const comission = 0.0007902;
  function valuetext(value) {
    return value;
  }
  function getMoneyAmount(e, val) {
    if (marks[Math.floor(val)] !== marks[marks.length - 1]) {
      setMoneyAmount(
        Math.round(
          (marks[Math.floor(val) + 1].sliderVal -
            marks[Math.floor(val)].sliderVal) *
            (val - Math.floor(val)) +
            marks[Math.floor(val)].sliderVal
        )
          .toString()
          .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")
      );
    } else {
      setMoneyAmount(
        marks[marks.length - 1].sliderVal
          .toString()
          .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")
      );
    }
    setRealAmount(val);
  }
  function getRealSliderValue() {
    console.log(moneyAmountNumber);

    if (moneyAmountNumber <= 1000) {
      setRealAmount(0);
    } else {
      for (var i = 1; i < marks.length; i++) {
        if (moneyAmountNumber < marks[i].sliderVal) {
          setRealAmount(
            +(
              (moneyAmountNumber - marks[i - 1].sliderVal) /
                (marks[i].sliderVal - marks[i - 1].sliderVal) +
              marks[i - 1].value
            ).toFixed(3)
          );
          break;
        } else if (moneyAmountNumber >= 1000000) {
          setRealAmount(6);
        }
      }
    }
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
    getRealSliderValue();
  }
  function currencyChange() {
    setCurrencyChanging(!currencyChanging);
  }
  function chooseCurrency(currency) {
    setChosenCurrency(currency);
    setCurrencyChanging(false);
  }
  function getMoneyAmountNumber() {
    setMoneyAmountNumber(+moneyAmount.replace(/\s/g, ""));
  }
  useEffect(() => {
    getMoneyAmountNumber();
  }, [moneyAmount]);
  return (
    <div className="calculator">
      <div className="container">
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
                defaultValue={0}
                getAriaValueText={valuetext}
                min={0}
                max={6}
                step={0.001}
                value={realAmount}
                marks={marks}
                onChange={getMoneyAmount}
              />
            </div>
          </div>
          <div className="calculator__col ">
            <div className="summary calculator__summary">
              <div className="summary__position">
                <div className="summary__title">
                  Комиссия за сделку и&nbsp;вывод валюты<sup>5</sup>
                </div>
                <div className="summary__data">
                  {Math.ceil(
                    moneyAmountNumber * chosenCurrency.cost * comission
                  )
                    .toString()
                    .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")}
                  &nbsp;₽
                </div>
              </div>
              <div className="summary__position">
                <div className="summary__title">Курс с учетом комисси</div>
                <div className="summary__data">
                  {(chosenCurrency.cost * 1.0007902)
                    .toFixed(4)
                    .toString()
                    .replace(/[.]/, ",")}
                  &nbsp;₽
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
                    .replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ")}
                  &nbsp;₽
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
