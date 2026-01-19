import React from "react";
import './Cart.css'

import { useDispatch,useSelector } from "react-redux";
import { increaseQuantity,decreaseQuantity,removeToCart,applyCoupon } from "../features/cartSlice";


const Cart = () => {
  const { cartItems, discount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const finalTotalPrice =
    totalPrice - (totalPrice * discount) / 100;

  return (
   <div className="cart-container">
  <h2>Cart</h2>

  {cartItems.map((item) => (
    <div key={item.id} className="cart-item">
      <h4>{item.title}</h4>

      <div className="quantity-controls">
        <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
      </div>

      <button
        className="remove-button"
        onClick={() => dispatch(removeToCart(item.id))}
      >
        Remove
      </button>
    </div>
  ))}

<input
  className="coupon-input"
  placeholder="Enter Coupon"
  onBlur={(e) => dispatch(applyCoupon(e.target.value))}
/>

 {discount > 0 && <p className="discount">Discount Applied : {discount}%</p>}
<h3 className="total-price">Total: ₹{Math.round(finalTotalPrice)}</h3>
<button style={{background:'green', color:'white', fontSize: '20px', fontWeight: 'bold'}}>Submit</button>

  
</div>

  );
};
export default Cart;