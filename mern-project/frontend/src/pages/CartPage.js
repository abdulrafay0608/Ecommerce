import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const removeCartItem = (id) => {
    try {
      let allCart = [...cart];
      const filter = allCart.filter((f) => f._id !== id);
      setCart(filter);
      localStorage.setItem("cart", JSON.stringify(filter));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrices = () => {
    try {
      let total = 0;
      cart.map((items) => (total += items.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {auth?.token && (
        <div className="fs-5 text-center my-3">{`Hello ${
          auth?.token && auth?.user.name
        }`}</div>
      )}
      {cart.length > 0 ? (
        <div className="fs-6 text-center my-4">{`You have ${
          cart?.length
        } items in your Cart ${
          auth?.token ? "" : "please Login to checkout"
        }`}</div>
      ) : (
        <div className="fs-5 text-center my-4">Your Cart is Empty</div>
      )}

      <div className="container row">
        <div className="col-md-8">
          {cart?.map((items, i) => {
            return (
              <div key={i} className="card my-2">
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      src={`/api/product/product-photo/${items?._id}`}
                      alt={items?.name}
                    />
                  </div>
                  <div className="p-2">
                    <h5 className="fs-5">{items?.name}</h5>
                    <p className="fs-6">{items?.description}</p>
                    <p className="fs-6 card-text">
                      <strong>${items?.price}</strong>
                    </p>
                    <p className="fs-6 card-text">
                      <strong>{items?.category.name}</strong>
                    </p>
                    <button
                      onClick={() => removeCartItem(items._id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {cart.length > 0 && (
          <div className="col-md-4 text-center">
            <h4 className="fs-2">Cart Summary</h4>
            <div className="text-center fs-6">Total | Checkout | Payment</div>
            <hr />
            <p className="fs-4 my-5">Total: {totalPrices()}</p>
            <div>
              {auth?.user?.address ? (
                <div>
                  <h6>
                    Current Address:
                    <span className="fs-6 fs-300 mx-3">
                      {auth.user.address}
                    </span>
                  </h6>
                  <div className="my-2">
                    <button
                      onClick={() => navigate("/dashboard/user/profile")}
                      className="btn btn-outline-warning"
                    >
                      Update Address
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/sign-in", { state: "/cart" })}
                      className="btn btn-outline-warning"
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
