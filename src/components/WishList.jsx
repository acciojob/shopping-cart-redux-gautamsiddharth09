import React from 'react'
import "./WishList.css"
import { useDispatch,useSelector } from 'react-redux'
import { toggleWishList } from '../features/wishListSlice'

const WishList = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(
    (state) => state.wishList.wishList
  );

  return (
   <div className="wishlist-container">
  <h2>Wishlist</h2>

  {wishlist.map((item) => (
    <div key={item.id} className="wishlist-item">
      <h4>{item.title}</h4>
      <button onClick={() => dispatch(toggleWishList(item))}>
        Remove
      </button>
    </div>
  ))}
</div>

  );
};

export default WishList;
