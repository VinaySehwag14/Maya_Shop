import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { KEY } from "../Keys";
import { userRequest } from "../requestMethods";
import Announcement from "../components/Announcement";
import axios from "axios";
import { Link } from "react-router-dom";
import { deleteProduct, emptyCart } from "../redux/cartRedux";
//* stripe key

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

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
  console.log(cart.total, "this is my cart total");
  const dispatch = useDispatch();
  //* stripe token
  const [stripeToken, setStripeToken] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  console.log(cart, "this is cart");
  console.log(stripeToken, "this is stripeToken🎂");

  //*using useHistory for
  const navigate = useNavigate();

  // const onToken = (token) => {
  //   console.log(token, "this is toklen🤷‍♀️");
  //   setStripeToken(token);
  // };

  const handleDelete = useCallback((product) => {
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
      })
    );
    console.log(product);
  }, []);

  console.log(stripeToken, "this is token");

  //* using useEffect for handling stripe token

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.total * 100,
  //       });
  //       console.log(res.data, "this is bakcend ress from stripe 🍺");
  //       console.log(cart, "this is bakcend cart");

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

    // Clean up the script tag on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCheckout = async () => {
    try {
      const res = await axios.post(
        "https://maya-shop-backend.onrender.com/api/checkout/payment",
        {
          amount: cart.total * 83, // set the payment amount here
        }
      );

      console.log(res.data, "this res.data for setting in state");
      setOrderId(res.data.orderId);

      // Load the Razorpay checkout form
      const options = {
        key: "rzp_test_5Lk8DNtlUH6L3E", // replace with your Razorpay key ID
        amount: res.data.amount,
        currency: "INR",
        name: "My App",
        description: "Payment for My App",
        order_id: res.data.id,
        handler: function (response) {
          console.log(response);
          // Call the payment success API to complete the payment
          axios
            .post(
              "https://maya-shop-backend.onrender.com/api/razorpay/capture",
              {
                orderId: orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }
            )

            .then((res) => {
              console.log(res.data);
              setPaymentSuccess(true);
            })
            .catch((err) => {
              console.log(err);
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
      console.log(err);
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
