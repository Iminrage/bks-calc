import React from "react";
import "./purchaseAmount.scss";

export default (props) => {
  return (
    <div className="purchase-amount">
      <label htmlFor="purchaseAmountInput" className="purchase-amount__label">
        <span className="purchase-amount__title">сумма покупки</span>
      </label>
      <input
        type="text"
        id="purchaseAmountInput"
        className="purchase-amount__value"
        value={props.amount}
        onChange={props.typeFunction}
        onBlur={props.moneySeparate}
      />
      <span className="purchase-amount__currency">
        {props.chosenCurrency.symbol}
      </span>
    </div>
  );
};
