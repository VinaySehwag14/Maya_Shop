import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { LogoutIcon } from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { useCallback, useState } from "react";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  console.log(user, "this is user navbar");
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <div className="h-[50px] sm:h-[60px] ">
      <div className="py-[10px] sm:px-[20px] flex justify-between items-center">
        <div className="flex-1 flex items-center">
          <span className="text-[14px] cursor-pointer hidden sm:inline">
            EN
          </span>
          <div className="border flex items-center ml-[25px] p-[5px] ">
            <input
              placeholder="search"
              type="text"
              className="outline-none w-[50px] sm:w-auto "
            />
            <Search className="text-gray-400 text-[16px] " />
          </div>
        </div>
        <div className="flex-1 text-center">
          <Link to="/">
            <h1 className="font-bold text-[24px] sm:text-3xl cursor-pointer ">
              MAYA.
            </h1>
          </Link>
        </div>

        <div className="flex-[2] sm:flex-1 flex items-center justify-center sm:justify-end ">
          {!user && (
            <>
              <div className="text-[12px] sm:text-[14px] cursor-pointer ml-[10px] sm:ml-[25px] ">
                <Link href="/register">REGISTER</Link>
              </div>
              <div className="text-[12px] sm:text-[14px] cursor-pointer ml-[10px] sm:ml-[25px] ">
                <Link href="/login">SIGN IN</Link>
              </div>
            </>
          )}
          {user && (
            <>
              <div
                onClick={() => setShowPopup((prev) => !prev)}
                className="relative cursor-pointer ml-[10px] border  space-x-3 rounded p-2 flex justify-between items-center "
              >
                <UserGroupIcon className="w-6 h-6 " />
                <div className="text-[12px] sm:text-[14px] tracking-wide ">
                  {user?.username.toUpperCase()}
                </div>
                <div
                  onClick={handleLogout}
                  className={`bg-white shadow-lg absolute bottom-[-70px] ${
                    !showPopup && "opacity-0"
                  } z-[3] p-4 rounded-md flex items-center
                transition duration-300 ease-in-out `}
                >
                  <LogoutIcon className="h-6 w-6 text-gray-600 mr-2 " />
                  <button className="text-[12px] sm:text-[14px] ">
                    LOGOUT
                  </button>
                </div>
              </div>
            </>
          )}
          <Link to="/cart">
            <Badge
              className="ml-[10px] sm:ml-[25px] cursor-pointer"
              badgeContent={quantity}
              color="primary"
            >
              <ShoppingCartOutlined />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
