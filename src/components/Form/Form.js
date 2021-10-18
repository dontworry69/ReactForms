import React, { useRef, useState } from "react";
import "./form.scss";

export function Form() {
  const [usersCardData, setUserCardData] = useState({
    cardNumber: "",
    cardDate: "",
    cardCVV: "",
  });
  const handlerInputCardData = (target) => {
    let position = target.selectionEnd,
      length = target.value.length;

    if (target.className === "pay-forms__credit-data_number") {
      target.value = target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      target.selectionEnd = position +=
        target.value.charAt(position - 1) === " " &&
        target.value.charAt(length - 1) === " " &&
        length !== target.value.length
          ? 1
          : 0;
      setUserCardData({ ...usersCardData, cardNumber: target.value });
    } else if (target.className === "pay-forms__credit-data_date") {
      target.value = target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{2})/g, "$1/");
      target.selectionEnd = position +=
        target.value.charAt(position - 1) === " " &&
        target.value.charAt(length - 1) === " " &&
        length !== target.value.length
          ? 1
          : 0;
      if(target.value.length === 3){
        target.selectionStart = target.value.length;
      }else if(target.value.length >4) {
        target.value = target.value.slice(0,-1);
      }
      setUserCardData({ ...usersCardData, cardDate: target.value });
    } else {
      target.value = target.value.replace(/[^\dA-Z]/g, "");
      target.selectionEnd = position +=
        target.value.charAt(position - 1) === " " &&
        target.value.charAt(length - 1) === " " &&
        length !== target.value.length
          ? 1
          : 0;

      setUserCardData({ ...usersCardData, cardCVV: target.value });
    }
  };

  const checkbox = useRef(false);
  const [isOpenForm, setOpenForm] = useState(false);
  const changeStateForm = () => setOpenForm(checkbox.current.checked);

  return (
    <section style={{ padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          onClick={() => changeStateForm()}
          ref={checkbox}
          type="checkbox"
        />{" "}
        credit card
      </div>
      <form className={`pay-forms ${isOpenForm && "active"}`}>
        <h3 className={`pay-forms__title`}>
          pay with your credit card via PayPal Website Payments
        </h3>
        <div className={`pay-forms__header`}>
          <label className={`pay-forms__credit-data`}>
            Card Number
            <input
              pattern="[0-9, &nbsp]{19}"
              placeholder={"**** **** **** ****"}
              type="text"
              onChange={(event) => {
                handlerInputCardData(event.target);
              }}
              size={19}
              maxLength={19}
              className={`pay-forms__credit-data_number`}
            />
          </label>
        </div>
        <div className={`pay-forms__main`}>
          <label className={`pay-forms__credit-data`} style={{ width: "40%" }}>
            Expiry(MM/YY)
            <input
              pattern="[0-9, /]{5}"
              placeholder={"MM/YY"}
              type="text"
              onInput={(event) => handlerInputCardData(event.target)}
              size={5}
              maxLength={5}
              className={`pay-forms__credit-data_date`}
            />
          </label>
          <label className={`pay-forms__credit-data`} style={{ width: "40%" }}>
            Card Code
            <input
              pattern="[0-9]{3}"
              placeholder={"CVV"}
              type="text"
              onInput={(event) => handlerInputCardData(event.target)}
              size={3}
              maxLength={3}
              className={`pay-forms__credit-data_cvv`}
            />
          </label>
        </div>
      </form>
    </section>
  );
}
