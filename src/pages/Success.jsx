import { Link, useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background:
          'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center',
      }}
      className="flex justify-center items-center h-screen "
    >
      <div className="shadow-lg border rounded-2xl p-8 flex flex-col items-center space-y-6 justify-center w-[300px] h-[450px] bg-gray-50 ">
        <div className="relative h-[60px] w-[60px] rounded-full p-10 border-2 border-gray-500 overflow-hidden ">
          <img
            src="https://avatars.githubusercontent.com/u/1486366?v=4"
            className="object-contain"
            alt="success"
          />
        </div>
        <p className="text-lg text-center ">
          Hooray! Your Payment was successful.
        </p>
        <Link to="/">
          <button className="bg-green-700 text-white p-4 transform transition duration-500 ease-in-out hover:scale-110 rounded-lg font-medium ">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
