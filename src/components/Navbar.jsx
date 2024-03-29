import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LogoutIcon } from "@heroicons/react/outline";
import { UserGroupIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { useCallback, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
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
                <Link to="/register">REGISTER</Link>
              </div>
              <div className="text-[12px] sm:text-[14px] cursor-pointer ml-[10px] sm:ml-[25px] ">
                <Link to="/login">SIGN IN</Link>
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
                  onClick={() => {
                    handleLogout();
                    navigate("/login");
                  }}
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
          <Link to={user ? "/cart" : "/login"}>
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
