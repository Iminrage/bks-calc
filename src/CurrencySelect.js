import React from "react";
import "./currencySelect.scss";
import currencies from "./currencies.json";

export default (props) => {
  return (
    <div className="currency-select">
      <div className="currency-select__title">Валюта</div>
      <button
        className="currency-select__arrow-btn"
        onClick={props.currencyChange}>
        <img
          className="currency-select__flag"
          src={require(`${props.chosenCurrency.icon}`)}
          alt={props.chosenCurrency}
        />
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.6 0L6 4.6L1.4 0L0 1.4L6 7.4L12 1.4L10.6 0Z"
            fill="#0073F1"
          />
        </svg>
      </button>
      <div className="currensy-select__value">
        {props.chosenCurrency.cost.toString().replace(/[.]/, ",")}&nbsp;₽
      </div>
      {props.isCurrencyChanging && (
        <div className="currensy-select__dropdown">
          <ul className="currensy-select__list">
            {currencies.map((currency, index) => {
              return (
                <li
                  className="currency-select__item"
                  key={index}
                  onClick={() => props.chooseCurrency(currency)}>
                  <div className="currency-select__flag">
                    <img
                      src={require(`${currency.icon}`)}
                      alt={currency.currency}
                    />
                  </div>
                  <div className="currency-select__name">
                    {currency.currency}
                  </div>
                  <div className="currency-select__cost">
                    {currency.cost.toString().replace(/[.]/, ",")}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
