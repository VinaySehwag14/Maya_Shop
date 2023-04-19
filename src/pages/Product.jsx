import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethods";
import AddAlertIcon from "@mui/icons-material/AddAlert";

const colorClass = (color) => {
  switch (color) {
    case "white":
      return "bg-[white]";
    case "black":
      return "bg-[black]";
    case "red":
      return "bg-[red]";
    case "blue":
      return "bg-[blue]";
    case "green":
      return "bg-[green]";
    case "yellow":
      return "bg-[yellow]";
  }
};

const Product = () => {
  const location = useLocation();
  //* getting category with the help of useLocation
  const productId = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  //*for dispatching product , quantity , price to store
  const dispatch = useDispatch();
  //* for fetching single product using id and also use axios instance for handling same code
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + productId);
        setProduct(res.data);
        console.log(product, "tjos os prod");
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [productId]);

  //* function for handling quantity

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    //*updating cart
    dispatch(
      addProduct({ ...product, quantity, color, size, showMsg: setShowMsg })
    );
  };

  return (
    <div>
      <Navbar />
      <Announcement />
      <div className="p-[10px] sm:p-[50px] flex flex-col sm:flex-row ">
        <div className="relative flex-1 w-full h-[40vh] sm:h-[90vh] object-cover">
          <img
            className="p-[10px] sm:p-[50px] flex flex-col sm:flex-row object-cover "
            src={product.img || "https://i.ibb.co/S6qMxwr/jean.jpg"}
            alt="product"
          />
        </div>
        <div className="flex-1 px-[10px] sm:px-[50px] ">
          <h1 className="font-extralight text-2xl ">{product.title}</h1>
          <p className="my-[20px] ">{product.desc}</p>
          <p className="font-thin text-[40px] ">$ {product.price}</p>
          <div className="flex justify-between sm:w-1/2 my-[30px] space-x-3 ">
            <div className="flex items-center space-x-2">
              <span className="text-[20px] font-extralight ">Color</span>
              {product.color?.map((c) => (
                <div
                  className={`w-[20px] h-[20px] rounded-full border ${
                    color === c && "ring border-0"
                  } ${colorClass(c)} mx-[5px] cursor-pointer `}
                  color={c}
                  key={c}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <div className="flex items-center ">
              <span className="text-[20px] font-extralight ">Size</span>
              <select
                onChange={(e) => setSize(e.target.value)}
                className="ml-[10px] p-[5px] outline-none "
              >
                <option>size</option>
                {product.size?.map((s) => (
                  <option key={s} value={s}>
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center sm:w-1/2 justify-between ">
            <div className="flex items-center font-bold ">
              <Remove onClick={() => handleQuantity("dec")} />
              <span
                className="w-[30px] h-[30px] rounded-[10px] border border-[teal]
                flex items-center justify-center mx-[5px] "
              >
                {quantity}
              </span>
              <Add
                onClick={() => handleQuantity("inc")}
                className="cursor-pointer"
              />
            </div>
            <button
              onClick={handleClick}
              className="p-[15px] border-2 border-[teal] bg-white cursor-pointer whitespace-nowrap
              font-medium hover:bg-[#f8f4f4] "
            >
              ADD TO CART
            </button>
          </div>
          <div
            className={`mt-4 sm:w-3/4 lg:w-1/2 transition duration-300 ${
              !showMsg && "opacity-0"
            }`}
          >
            <AddAlertIcon
              variant="outlined"
              color="success"
              onClose={() => setShowMsg(false)}
            >
              Added to cart
            </AddAlertIcon>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};
export default Product;
