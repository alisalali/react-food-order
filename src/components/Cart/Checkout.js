import React from "react";
import classes from "./Checkout.module.css";
import useValidation from "../../hooks/use-validation";

const isNotEmpty = (value) => value.trim("") !== "";

const Checkout = (props) => {
  const {
    value: nameInput,
    isValid: nameInputIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: onChangeNameHandler,
    inputBlurHandler: onBlurNameHandler,
    restInput: restNameInput,
  } = useValidation(isNotEmpty);

  const {
    value: streetInput,
    isValid: streetInputIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: onChangeStreetHandler,
    inputBlurHandler: onBlurStreetHandler,
    restInput: restStreetInput,
  } = useValidation(isNotEmpty);

  const {
    value: postalInput,
    isValid: postalInputIsValid,
    hasError: postalInputHasError,
    valueChangeHandler: onChangePostalHandler,
    inputBlurHandler: onBlurPostalHandler,
    restInput: restPostalInput,
  } = useValidation(isNotEmpty);
  const {
    value: cityInput,
    isValid: cityInputIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: onChangeCityHandler,
    inputBlurHandler: onBlurCityHandler,
    restInput: restCityInput,
  } = useValidation(isNotEmpty);

  // validate for form fields
  let formIsValid = false;
  if (
    nameInputIsValid &&
    streetInputIsValid &&
    postalInputIsValid &&
    cityInputIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      console.log("form is not valid", formIsValid);
      return;
    }
    console.log("form is successfully", {
      Address: { nameInput, streetInput, postalInput, cityInput },
    });
    restNameInput();
    restStreetInput();
    restPostalInput();
    restCityInput();
  };

  const nameControlClass = `${classes.control} ${
    nameInputHasError ? classes.invalid : ""
  }`;
  const streetControlClass = `${classes.control} ${
    streetInputHasError ? classes.invalid : ""
  }`;
  const postalControlClass = `${classes.control} ${
    postalInputHasError ? classes.invalid : ""
  }`;
  const cityControlClass = `${classes.control} ${
    cityInputHasError ? classes.invalid : ""
  }`;
  return (
    <div>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClass}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={nameInput}
            onChange={onChangeNameHandler}
            onBlur={onBlurNameHandler}
          />
          {nameInputHasError && <p>Enter Valid Name</p>}
        </div>
        <div className={streetControlClass}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={streetInput}
            onChange={onChangeStreetHandler}
            onBlur={onBlurStreetHandler}
          />
          {streetInputHasError && <p>Enter Valid Street</p>}
        </div>

        <div className={postalControlClass}>
          <label htmlFor="postal">Postal code</label>
          <input
            type="text"
            id="postal"
            value={postalInput}
            onChange={onChangePostalHandler}
            onBlur={onBlurPostalHandler}
          />
          {postalInputHasError && <p>Enter Valid Postal</p>}
        </div>

        <div className={cityControlClass}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={cityInput}
            onChange={onChangeCityHandler}
            onBlur={onBlurCityHandler}
          />
          {cityInputHasError && <p>Enter Valid City</p>}
        </div>
        <div className={classes.actions}>
          <button onClick={props.onClose}>Cancel</button>
          <button>Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
