import classes from "./Cart.module.css";
import Model from "../UI/Model";
const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 29 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Model>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>$35.99</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Model>
  );
};

export default Cart;
