import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { KEY } from "../Keys";
import Announcement from "../components/Announcement";
import axios from "axios";
import { Link } from "react-router-dom";
import { deleteProduct, emptyCart } from "../redux/cartRedux";

const colorClass = (color) => {
  switch (color) {
    case "White":
      return "bg-[white]";
    case "Black":
      return "bg-[black]";
    case "Red":
      return "bg-[red]";
    case "Blue":
      return "bg-[blue]";
    case "Green":
      return "bg-[green]";
    case "Brown":
      return "bg-[brown]";
    case "Yellow":
      return "bg-[yellow]";
  }
};

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  // console.log(cart.total, "this is my cart total");
  const dispatch = useDispatch();
  //* stripe token
  const [stripeToken, setStripeToken] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // console.log(cart, "this is cart");
  // console.log(stripeToken, "this is stripeToken🎂");

  // const onToken = (token) => {
  // console.log(token, "this is toklen🤷‍♀️");
  //   setStripeToken(token);
  // };

  const handleDelete = useCallback((product) => {
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
      })
    );
    // console.log(product);
  }, []);

  // console.log(stripeToken, "this is token");

  //* using useEffect for handling stripe token

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.total * 100,
  //       });
  // console.log(res.data, "this is bakcend ress from stripe 🍺");
  // console.log(cart, "this is bakcend cart");

  //       //* going to success page after payment succession
  //       navigate("/success", {
  //         stripeData: res.data,
  //         products: cart,
  //       });
  //     } catch {}
  //   };
  //   stripeToken && cart.total >= 1 && makeRequest();
  // }, [stripeToken, cart.total, navigate]);

  useEffect(() => {
    // Load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    //* Clean up the script tag on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCheckout = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}checkout/payment`,
        {
          amount: cart.total * 83, //* setting the payment amount here
        }
      );

      // console.log(res.data, "this res.data for setting in state");
      setOrderId(res.data.orderId);

      //*Load the Razorpay checkout form
      const options = {
        key: "rzp_test_5Lk8DNtlUH6L3E",
        amount: res.data.amount,
        currency: "INR",
        name: "My App",
        description: "Payment for My App",
        order_id: res.data.id,
        handler: function (response) {
          // console.log(response);
          // Call the payment success API to complete the payment
          axios
            .post(`${process.env.REACT_APP_API}checkout/capture`, {
              orderId: orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            })

            .then((res) => {
              // console.log(res.data);
              setPaymentSuccess(true);
            })
            .catch((err) => {
              // console.log(err);
              setPaymentError(err.message);
            });
        },
        prefill: {
          email: "test@example.com",
          contact: "9876543210",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
      };

      // Check if Razorpay is defined
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Retry after 500ms
        setTimeout(() => {
          openCheckout();
        }, 500);
      }
    } catch (err) {
      // console.log(err);
      setPaymentError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Announcement />
      <div className="p-[10px] sm:p-[20px] ">
        <h1 className="font-light text-center text-2xl ">YOUR BAG</h1>
        <div className="flex items-center justify-between p-[20px] ">
          <Link to="/">
            <button className="p-[10px] font-semibold cursor-pointer bg-transparent border-2 text-xs border-black ">
              CONTINUE SHOPPING
            </button>
          </Link>
          <div className="hidden sm:block">
            <span className="underline cursor-pointer mx-[10px] ">
              Shopping Bag({cart.products.length})
            </span>
            <span className="underline cursor-pointer mx-[10px] ">
              Your Wishlist (0)
            </span>
          </div>
          <button
            onClick={() => dispatch(emptyCart())}
            className="p-[10px] font-semibold cursor-pointer bg-black text-white text-xs "
            type="filled"
          >
            EMPTY CART
          </button>
        </div>
        <div className="flex justify-between flex-col sm:flex-row ">
          <div className="flex-[3] ">
            {cart.products.map((product) => (
              <div
                key={product._id}
                className="flex justify-between flex-col sm:flex-row border-b "
              >
                <div className="flex-[2] flex ">
                  <img
                    src={product.img}
                    className="relative w-[200px] h-[262px] object-contain"
                    alt="productImg"
                  />
                  <div className="p-[20px] flex flex-col justify-around ">
                    <span>
                      <b>Product:</b> {product.title}
                    </span>
                    <span>
                      <b>ID:</b> {product._id}
                    </span>
                    <span
                      className={`w-[20px] h-[20px] rounded-full ${colorClass(
                        product.color
                      )} cursor-pointer `}
                    />
                    <span>
                      <b>Size:</b> {product.size.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center flex-col">
                  <div className="flex items-center mb-[20px] ">
                    <Add />
                    <span className="text-[24px] my-[5px] mx-[15px] sm:mx-[5px] ">
                      {product.quantity}
                    </span>
                    <Remove />
                  </div>
                  <span className="text-[30px] font-extralight mb-[20px] sm:mb-0 ">
                    $ {product.price * product.quantity}
                  </span>
                  <DeleteOutline
                    onClick={() => handleDelete(product)}
                    className="text-red-600 mt-6 cursor-pointer "
                  />
                </div>
              </div>
            ))}
            <hr className="bg-[#eee] h-[1px] " />
          </div>
          <div className="flex-1 w-full border rounded-[10px] p-[20px] self-start md:h-[50vh] ">
            <h1 className="font-extralight text-2xl ">ORDER SUMMARY</h1>
            <div className="my-[30px] flex justify-between ">
              <span>Subtotal</span>
              <span>$ {cart.total}</span>
            </div>
            <div className="my-[30px] flex justify-between ">
              <span>Estimated Shipping</span>
              <span>$ 5.90</span>
            </div>
            <div className="my-[30px] flex justify-between ">
              <span>Shipping Discount</span>
              <span>$ -5.90</span>
            </div>
            <div
              className="my-[30px] flex justify-between font-medium text-[24px] "
              type="total"
            >
              <span>Total</span>
              <span>$ {cart.total}</span>
            </div>
            <button
              className="w-full p-[10px] bg-black text-white font-semibold "
              onClick={openCheckout}
            >
              CHECKOUT NOW
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
