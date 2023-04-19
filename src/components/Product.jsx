import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.h1`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <div
      className="flex-1 m-[5px] min-w-[280px] h-[350px] flex items-center
    justify-center bg-[#f5fbfd] relative group cursor-pointer  "
    >
      <div className="w-[200px] h-[200px] rounded-full bg-white absolute "></div>

      <img className="h-3/4 z-[2]" src={item.img} alt="clothes" />
      <div
        className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] z-[3]
        flex items-center justify-center opacity-0 group-hover:opacity-100 transition
        duration-500 ease-in-out "
      >
        <div
          className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center
          m-[10px] hover:bg-[#e9f5f5] transform hover:scale-110 transition duration-500 cursor-pointer "
        >
          <ShoppingCartOutlined />
        </div>
        <div
          className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center
          m-[10px] hover:bg-[#e9f5f5] transform hover:scale-110 transition duration-500 cursor-pointer "
        >
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </div>
        <div
          className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center
          m-[10px] hover:bg-[#e9f5f5] transform hover:scale-110 transition duration-500 cursor-pointer "
        >
          <FavoriteBorderOutlined />
        </div>
      </div>
    </div>
  );
};

export default Product;
