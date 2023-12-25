import { useState, useContext, Fragment } from "react";

import Model from "../UI/Model";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidIsSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    console.log(userData);
    setIsSubmitting(true);
    await fetch(
      "https://react-food-order-87a4b-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidIsSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModelContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order Data...</p>;
  const didSubmittingModalContent = (
    <Fragment>
      <p>Successfully sent the Ordered</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Model onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModelContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmittingModalContent}
    </Model>
  );
};

export default Cart;
